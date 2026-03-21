FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libpq-dev libjpeg-dev libpng-dev libfreetype6-dev zlib1g-dev \
    sqlite3 wget unzip supervisor libonig-dev \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application
COPY . .

# Create required directories before Composer scripts run
RUN mkdir -p storage/logs storage/ai bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose port (FPM listens on 9000 internally)
EXPOSE 9000

CMD ["php-fpm"]
