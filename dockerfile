FROM php:8.1-apache

# Install required libraries
RUN apt-get update && apt-get install -y libssl1.0.0 libssl-dev

# Install Composer
COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

# Set up the Laravel application
COPY . /var/www/html
WORKDIR /var/www/html

# Install dependencies and cache configuration
RUN composer install --optimize-autoloader --no-dev
RUN php artisan config:cache
RUN php artisan route:cache

# Expose port 80
EXPOSE 80
