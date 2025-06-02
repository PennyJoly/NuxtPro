CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`refresh_token_expires_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);

CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);

CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL,
	`image` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`invite_code` varchar(8) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);

CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
