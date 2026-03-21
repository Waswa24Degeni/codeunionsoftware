<?php

use Illuminate\Support\Facades\Schedule;

// Daily cleanup of expired sessions
Schedule::command('session:gc')->daily();

// Weekly search index sync
Schedule::command('scout:sync-index-settings')->weekly();

// Daily AI usage log rotation
Schedule::command('ai:rotate-logs')->daily();

// Hourly queue restart check
Schedule::command('queue:restart')->hourly();
