<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class SystemNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly string $title,
        private readonly string $message,
        private readonly ?string $url = null,
        private readonly string $level = 'info',
        private readonly array $meta = [],
    ) {}

    public function via(object $notifiable): array
    {
        $channels = ['database'];

        $broadcastConnection = (string) config('broadcasting.default', 'null');
        if (!in_array($broadcastConnection, ['null', 'log'], true)) {
            $channels[] = 'broadcast';
        }

        return $channels;
    }

    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'url' => $this->url,
            'level' => $this->level,
            'meta' => $this->meta,
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
}
