-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 04:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `cartTotal` double NOT NULL,
  `orderById` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(4, 'notebook', '2025-04-14 12:13:54.220', '2025-04-14 12:13:54.220'),
(6, 'demo', '2025-04-14 12:14:18.981', '2025-04-14 12:14:18.981'),
(9, 'demo 1', '2025-04-14 12:27:57.944', '2025-04-14 12:27:57.944');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `asset_id` varchar(191) NOT NULL,
  `public_id` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `secure_url` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `asset_id`, `public_id`, `url`, `secure_url`, `createdAt`, `updatedAt`, `productId`) VALUES
(35, '9bbb24f4649fa1379bf13619120d3a7d', 'Ecom2025/ecom-1744769445443', 'http://res.cloudinary.com/dcmqntrsq/image/upload/v1744769448/Ecom2025/ecom-1744769445443.jpg', 'https://res.cloudinary.com/dcmqntrsq/image/upload/v1744769448/Ecom2025/ecom-1744769445443.jpg', '2025-04-16 02:10:49.479', '2025-04-16 02:10:49.479', 81),
(38, '133d103c536aaf3c597cf8e07872b43f', 'Ecom2025/ecom-1744771135208', 'http://res.cloudinary.com/dcmqntrsq/image/upload/v1744771139/Ecom2025/ecom-1744771135208.jpg', 'https://res.cloudinary.com/dcmqntrsq/image/upload/v1744771139/Ecom2025/ecom-1744771135208.jpg', '2025-04-16 02:39:00.352', '2025-04-16 02:39:00.352', 92);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `orderStatus` varchar(191) NOT NULL DEFAULT 'Not Process',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `cartTotal` double NOT NULL,
  `orderById` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `sold` int(11) NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `price`, `sold`, `quantity`, `createdAt`, `updatedAt`, `categoryId`) VALUES
(1, 'demo', 'desc z', 400, 0, 100, '2025-04-14 13:42:28.509', '2025-04-14 13:42:28.509', 6),
(2, 'demo', 'desc z', 400, 0, 100, '2025-04-14 13:42:29.248', '2025-04-14 13:42:29.248', NULL),
(10, 'ram8gb cx', 'desc', 400, 0, 10, '2025-04-14 13:44:00.066', '2025-04-14 13:44:00.066', 6),
(11, 'ram8gb cx', 'desc', 400, 0, 10, '2025-04-14 13:44:00.983', '2025-04-14 13:44:00.983', 4),
(12, 'ram8gb cx', 'desc', 400, 0, 10, '2025-04-14 13:44:13.499', '2025-04-14 13:44:13.499', 4),
(13, 'ram8gb c', 'desc', 400, 0, 10, '2025-04-14 13:44:13.618', '2025-04-14 13:44:13.618', 4),
(14, 'ram8gb cq', 'desc', 400, 0, 10, '2025-04-14 13:44:15.448', '2025-04-14 13:44:15.448', 4),
(35, 're', 'desc', 400, 0, 10, '2025-04-14 20:08:42.642', '2025-04-14 20:08:42.642', 6),
(36, 're', 'desc', 400, 0, 10, '2025-04-14 20:08:43.392', '2025-04-14 20:08:43.392', 4),
(37, 're', 'desc', 400, 0, 10, '2025-04-14 20:08:52.565', '2025-04-14 20:08:52.565', 4),
(81, 'q', 'q', 400, 0, 10, '2025-04-14 20:25:25.614', '2025-04-16 02:10:49.479', 6),
(92, 'rrr', 'r', 2, 0, 7, '2025-04-16 02:39:00.352', '2025-04-16 02:39:00.352', 4);

-- --------------------------------------------------------

--
-- Table structure for table `productoncart`
--

CREATE TABLE `productoncart` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productonorder`
--

CREATE TABLE `productonorder` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `name` varchar(191) DEFAULT NULL,
  `picture` varchar(191) DEFAULT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'user',
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `address` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `picture`, `role`, `enabled`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'admin@gmail.com', '$2a$10$VnlxZAeLXeh9ra6X3TuKv.6GHMcMqfgpEU/HgH.7BMCFn8JOTMowC', NULL, NULL, 'admin', 1, NULL, '2025-04-05 18:26:38.430', '2025-04-05 18:26:38.430'),
(2, 'user@gmail.com', '$2a$10$4cnmGpTQI4mtv4YGU8iGTuqdXGvgmdNnGDlNkSdW/DTxjy2C/ix.S', NULL, NULL, 'user', 1, NULL, '2025-04-13 10:39:06.779', '2025-04-13 10:39:06.779');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1df631d2-45d4-4ec7-9f35-cb2c922c6a8b', '6cc042aa0072514d18c0ada0d7c805a9d6c7e82e1309a45e85505bdfcfdc8745', '2025-04-05 18:26:11.996', '20250129183523_updatecategory_id', NULL, NULL, '2025-04-05 18:26:11.961', 1),
('24a7b95a-3d5a-4cff-bc67-baaf327b4580', 'f814319312dfb97911fea50266e90b452e0108c6d3cb62dbb4f3f247f9599984', '2025-04-05 18:26:12.170', 'stripePaymentId', NULL, NULL, '2025-04-05 18:26:12.164', 1),
('3c75aea3-d2af-4aa8-a5ce-b01fd6746b49', 'cd7443fde93f6bf62f3d6508e03f0e826f4a314de7c646305cea14a51b7ad15c', '2025-04-05 18:26:12.163', '20250312220436_update', NULL, NULL, '2025-04-05 18:26:12.094', 1),
('94741e75-31c9-41c1-9e12-dd7f792d9cf6', '7fe5e4d2154f1f77e243e4e9d0afd6990e9ae7da2c565d60a0b9d21d852c58b5', '2025-04-05 18:26:11.959', '20241208050443_ecom', NULL, NULL, '2025-04-05 18:26:11.683', 1),
('c4451096-fb52-442a-903d-4bfd8abcfcf0', 'c9d900a17d18733f524bd1cf8b3ecc57caceab3ee09d9f9e8095f622fd1a26e8', '2025-04-05 18:26:12.039', '20250312213032_update', NULL, NULL, '2025-04-05 18:26:11.997', 1),
('c5b1cedd-22b0-4e9d-a9b7-51a1c416e746', '4ba9d9c3db3596a5adb996546b1a0e720a997a1a698fbe8690922406e927b7f9', '2025-04-05 18:26:12.093', '20250312214713_update', NULL, NULL, '2025-04-05 18:26:12.085', 1),
('e66bcec3-4e84-4ef2-89fd-f3c264eb1d48', '236679c172d0ed08fa66b8b33b015ddb78703ce218c5cd0fc32473470a66f3b3', '2025-04-05 18:26:12.084', '20250312213521_update', NULL, NULL, '2025-04-05 18:26:12.040', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cart_orderById_fkey` (`orderById`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Image_productId_fkey` (`productId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_orderById_fkey` (`orderById`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `productoncart`
--
ALTER TABLE `productoncart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productOnCart_cartId_fkey` (`cartId`),
  ADD KEY `productOnCart_productId_fkey` (`productId`);

--
-- Indexes for table `productonorder`
--
ALTER TABLE `productonorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productOnOrder_productId_fkey` (`productId`),
  ADD KEY `productOnOrder_orderId_fkey` (`orderId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `productoncart`
--
ALTER TABLE `productoncart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productonorder`
--
ALTER TABLE `productonorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_orderById_fkey` FOREIGN KEY (`orderById`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_orderById_fkey` FOREIGN KEY (`orderById`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productoncart`
--
ALTER TABLE `productoncart`
  ADD CONSTRAINT `productOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `productonorder`
--
ALTER TABLE `productonorder`
  ADD CONSTRAINT `productOnOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productOnOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
