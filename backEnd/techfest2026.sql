-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2026 at 04:50 PM
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
-- Database: `techfest2026`
--

-- --------------------------------------------------------

--
-- Table structure for table `collide_registrations`
--

CREATE TABLE `collide_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `faculty_name` varchar(100) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cosplay_registrations`
--

CREATE TABLE `cosplay_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `chosen_character` varchar(100) NOT NULL,
  `music_file` varchar(255) DEFAULT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mlbb_registrations`
--

CREATE TABLE `mlbb_registrations` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `team_name` varchar(100) NOT NULL,
  `captain` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `ign` varchar(50) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station1_registrations`
--

CREATE TABLE `station1_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station2_registrations`
--

CREATE TABLE `station2_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station3_registrations`
--

CREATE TABLE `station3_registrations` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(9) NOT NULL,
  `registration_form` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station4_registrations`
--

CREATE TABLE `station4_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station5_registrations`
--

CREATE TABLE `station5_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station6_registrations`
--

CREATE TABLE `station6_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `category` varchar(100) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `station7_registrations`
--

CREATE TABLE `station7_registrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `techtalks_registrations`
--

CREATE TABLE `techtalks_registrations` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `student_number` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `valorant_registrations`
--

CREATE TABLE `valorant_registrations` (
  `id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  `team_name` varchar(100) NOT NULL,
  `captain` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `student_number` varchar(20) NOT NULL,
  `ign` varchar(50) NOT NULL,
  `registration_form` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collide_registrations`
--
ALTER TABLE `collide_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_number` (`student_number`);

--
-- Indexes for table `cosplay_registrations`
--
ALTER TABLE `cosplay_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_number` (`student_number`),
  ADD UNIQUE KEY `chosen_character` (`chosen_character`);

--
-- Indexes for table `mlbb_registrations`
--
ALTER TABLE `mlbb_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_student_global` (`student_number`);

--
-- Indexes for table `station1_registrations`
--
ALTER TABLE `station1_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_number` (`student_number`),
  ADD UNIQUE KEY `student_number_2` (`student_number`);

--
-- Indexes for table `techtalks_registrations`
--
ALTER TABLE `techtalks_registrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `valorant_registrations`
--
ALTER TABLE `valorant_registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_number` (`student_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collide_registrations`
--
ALTER TABLE `collide_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cosplay_registrations`
--
ALTER TABLE `cosplay_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `station1_registrations`
--
ALTER TABLE `station1_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `techtalks_registrations`
--
ALTER TABLE `techtalks_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
