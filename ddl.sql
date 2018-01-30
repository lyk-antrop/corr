/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `styles` (
`id` int(11) unsigned NOT NULL AUTO_INCREMENT,
`uuid` varchar(255) NOT NULL DEFAULT '',
`hostname` varchar(255) NOT NULL,
`selector` varchar(255) NOT NULL DEFAULT '',
`row` varchar(255) NOT NULL DEFAULT '',
`value` varchar(255) NOT NULL DEFAULT '',
`token` varchar(31) DEFAULT NULL,
`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary table structure for view `v_cookies`
--

DROP TABLE IF EXISTS `v_cookies`;
/*!50001 DROP VIEW IF EXISTS `v_cookies`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_cookies` AS SELECT 
1 AS `hostname`,
1 AS `created_at`,
1 AS `uuid`,
1 AS `cookie`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_stylerows`
--

DROP TABLE IF EXISTS `v_stylerows`;
/*!50001 DROP VIEW IF EXISTS `v_stylerows`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_stylerows` AS SELECT 
1 AS `hostname`,
1 AS `created_at`,
1 AS `uuid`,
1 AS `selectorrow`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'oxid_r2g_corr'
--

--
-- Final view structure for view `v_cookies`
--

/*!50001 DROP VIEW IF EXISTS `v_cookies`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `v_cookies` AS select `v_stylerows`.`hostname` AS `hostname`,`v_stylerows`.`created_at` AS `created_at`,`v_stylerows`.`uuid` AS `uuid`,concat('{',group_concat(`v_stylerows`.`selectorrow` separator ','),'}') AS `cookie` from `v_stylerows` group by `v_stylerows`.`uuid` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_stylerows`
--

/*!50001 DROP VIEW IF EXISTS `v_stylerows`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013  SQL SECURITY DEFINER */
/*!50001 VIEW `v_stylerows` AS select `styles`.`hostname` AS `hostname`,`styles`.`created_at` AS `created_at`,`styles`.`uuid` AS `uuid`,concat('"',`styles`.`selector`,'":[',group_concat(concat('{"style":"',`styles`.`row`,'","value":"',`styles`.`value`,'"}') separator ','),']') AS `selectorrow` from `styles` group by `styles`.`uuid`,`styles`.`selector` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-30 13:51:16