CREATE DATABASE cryptocurrency;

USE cryptocurrency;

CREATE TABLE `users` (
    `user_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(20) NOT NULL,
    `email` varchar(50) NOT NULL,
    `password` varchar(100) NOT NULL,
    `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY `unique_username` (`username`),
    UNIQUE KEY `unique_email` (`email`)
);

CREATE TABLE `currency` (
    `currency_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `code` varchar(10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `type` ENUM('crypto', 'fiat') NOT NULL,

    UNIQUE KEY `unique_code` (`code`)
);

CREATE TABLE `cryptoWallet` (
    `cryptoWallet_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `user_id` bigint NOT NULL,
    `currency_id` bigint NOT NULL,
    `balance` DECIMAL(20, 8) NOT NULL,

    UNIQUE KEY `unique_wallet_per_currency` (`user_id`, `currency_id`),

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currency(currency_id) ON DELETE CASCADE
);

CREATE TABLE `fiatWallet` (
    `fiatWallet_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `user_id` bigint NOT NULL,
    `currency_id` bigint NOT NULL,
    `balance` DECIMAL(20, 8) NOT NULL,

    UNIQUE KEY `unique_wallet_per_currency` (`user_id`, `currency_id`),

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currency(currency_id) ON DELETE CASCADE
);

CREATE TABLE `orders` (
    `order_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `user_id` bigint NOT NULL,
    `order_type` ENUM('buy', 'sell') NOT NULL, 
    `currency_id` bigint NOT NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `price_per_unit` DECIMAL(20, 8) NOT NULL,
    `status` ENUM('open', 'matched', 'completed', 'cancelled') NOT NULL,
    `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currency(currency_id) ON DELETE CASCADE
);

CREATE TABLE `transaction` (
    `transaction_id` bigint AUTO_INCREMENT PRIMARY KEY,
    `from_user_id` bigint NOT NULL,
    `to_user_id` bigint NOT NULL,
    `amount` DECIMAL(20, 8) NOT NULL,
    `transaction_type` ENUM('buy', 'sell', 'transfer', 'deposit', 'withdraw') NOT NULL, 
    `from_currency_id` bigint NOT NULL,
    `to_currency_id` bigint NOT NULL,
    `transaction_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (from_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (to_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (from_currency_id) REFERENCES currency(currency_id) ON DELETE CASCADE,
    FOREIGN KEY (to_currency_id) REFERENCES currency(currency_id) ON DELETE CASCADE
);