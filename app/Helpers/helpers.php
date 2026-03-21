<?php

if (! function_exists('format_currency')) {
    /**
     * Format a numeric value as currency.
     */
    function format_currency(float|int|string $amount, string $currency = 'USD'): string
    {
        $formatter = new \NumberFormatter('en_US', \NumberFormatter::CURRENCY);
        return $formatter->formatCurrency((float) $amount, $currency);
    }
}

if (! function_exists('initials')) {
    /**
     * Get initials from a full name (up to 2 characters).
     */
    function initials(string $name): string
    {
        $parts = explode(' ', trim($name));
        if (count($parts) === 1) {
            return strtoupper(substr($parts[0], 0, 2));
        }
        return strtoupper(substr($parts[0], 0, 1) . substr(end($parts), 0, 1));
    }
}

if (! function_exists('time_ago')) {
    /**
     * Return a human-readable "time ago" string.
     */
    function time_ago(\DateTimeInterface|string $datetime): string
    {
        $dt = $datetime instanceof \DateTimeInterface
            ? $datetime
            : new \DateTime($datetime);
        return \Carbon\Carbon::instance($dt)->diffForHumans();
    }
}

if (! function_exists('truncate')) {
    /**
     * Truncate a string to the given length, appending an ellipsis.
     */
    function truncate(string $text, int $length = 150, string $end = '...'): string
    {
        return mb_strlen($text) <= $length
            ? $text
            : mb_substr($text, 0, $length - mb_strlen($end)) . $end;
    }
}

if (! function_exists('sanitize_html')) {
    /**
     * Strip dangerous HTML tags from a string.
     */
    function sanitize_html(string $html): string
    {
        return strip_tags($html, '<p><br><strong><em><ul><ol><li><h1><h2><h3><h4><a><blockquote><code><pre>');
    }
}
