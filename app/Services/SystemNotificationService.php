<?php

namespace App\Services;

use App\Models\Client;
use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class SystemNotificationService
{
    public function notifyAdmins(
        string $title,
        string $message,
        ?string $url = null,
        string $level = 'info',
        array $meta = [],
        ?int $excludeUserId = null,
    ): void {
        $this->notifyRoles(['super-admin', 'admin', 'editor', 'support'], $title, $message, $url, $level, $meta, $excludeUserId);
    }

    public function notifyClient(
        ?Client $client,
        string $title,
        string $message,
        ?string $url = null,
        string $level = 'info',
        array $meta = [],
    ): void {
        $user = $client?->user;
        if (!$user) {
            return;
        }

        $this->notifyUsers([$user], $title, $message, $url, $level, $meta);
    }

    public function notifyRoles(
        array $roles,
        string $title,
        string $message,
        ?string $url = null,
        string $level = 'info',
        array $meta = [],
        ?int $excludeUserId = null,
    ): void {
        if (!$this->notificationsTableReady()) {
            return;
        }

        $query = User::query()->role($roles)->whereNotNull('email_verified_at');

        if ($excludeUserId) {
            $query->where('id', '!=', $excludeUserId);
        }

        $this->notifyUsers($query->get(), $title, $message, $url, $level, $meta);
    }

    public function notifyUsers(
        iterable $users,
        string $title,
        string $message,
        ?string $url = null,
        string $level = 'info',
        array $meta = [],
    ): void {
        if (!$this->notificationsTableReady()) {
            return;
        }

        Collection::make($users)
            ->filter(fn ($user) => $user instanceof User)
            ->unique('id')
            ->each(function (User $user) use ($title, $message, $url, $level, $meta) {
                $user->notify(new SystemNotification($title, $message, $url, $level, $meta));
            });
    }

    private function notificationsTableReady(): bool
    {
        static $ready = null;

        if ($ready === null) {
            $ready = Schema::hasTable('notifications');
        }

        return $ready;
    }
}
