<?php

namespace App\Controllers\Notifications;

use App\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class NotificationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if (!$this->isReady()) {
            return response()->json([
                'items' => [],
                'unreadCount' => 0,
            ]);
        }

        $limit = min(max((int) $request->integer('limit', 10), 1), 50);

        $items = $request->user()
            ->notifications()
            ->latest()
            ->limit($limit)
            ->get()
            ->map(fn ($notification) => $this->transformNotification($notification))
            ->values();

        return response()->json([
            'items' => $items,
            'unreadCount' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function markAsRead(Request $request, string $id): JsonResponse
    {
        if (!$this->isReady()) {
            return response()->json(['ok' => true, 'unreadCount' => 0]);
        }

        $notification = $request->user()->notifications()->findOrFail($id);
        if ($notification->read_at === null) {
            $notification->markAsRead();
        }

        return response()->json([
            'ok' => true,
            'unreadCount' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function markAllAsRead(Request $request): JsonResponse
    {
        if (!$this->isReady()) {
            return response()->json(['ok' => true, 'unreadCount' => 0]);
        }

        $request->user()->unreadNotifications()->update(['read_at' => now()]);

        return response()->json([
            'ok' => true,
            'unreadCount' => 0,
        ]);
    }

    private function transformNotification($notification): array
    {
        $data = is_array($notification->data) ? $notification->data : [];

        return [
            'id' => $notification->id,
            'title' => (string) ($data['title'] ?? 'Notification'),
            'message' => (string) ($data['message'] ?? ''),
            'url' => $data['url'] ?? null,
            'level' => (string) ($data['level'] ?? 'info'),
            'meta' => is_array($data['meta'] ?? null) ? $data['meta'] : [],
            'read_at' => optional($notification->read_at)?->toIso8601String(),
            'created_at' => optional($notification->created_at)?->toIso8601String(),
            'created_at_human' => optional($notification->created_at)?->diffForHumans(),
        ];
    }

    private function isReady(): bool
    {
        static $ready = null;

        if ($ready === null) {
            $ready = Schema::hasTable('notifications');
        }

        return $ready;
    }
}
