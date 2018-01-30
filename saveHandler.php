<?php

require "vendor/autoload.php";
use Symfony\Component\Yaml\Yaml as Yaml;

$config = Yaml::parse(file_get_contents('config.yml'));
$pdo = new PDO(sprintf('mysql:host=%s;dbname=%s', $config['dbhost'], $config['dbname']), $config['dbuser'], $config['dbpass']);

$mappings = [
    'hostname' => $_GET['s'],
    'uuid'     => $_GET['t'],
    'selector' => $_GET['sel'],
    'row'      => $_GET['stl'],
    'value'    => $_GET['val'],
];

$stmt = $pdo->prepare ( 'INSERT INTO styles (`hostname`, `uuid`, `selector`, `row`, `value`) VALUES (:hostname, :uuid, :selector, :row, :value)');
$result = ((int) $stmt->execute($mappings) ?: $stmt->errorCode());

echo $_GET['callback'] . '(' . json_encode(['result' => $result, 'selector' => $mappings['selector']]) . ')';

// VIEW v_stylerows
// select
//     `oxid_r2g_corr`.`styles`.`hostname` AS `hostname`,
//     `oxid_r2g_corr`.`styles`.`created_at` AS `created_at`,
//     `oxid_r2g_corr`.`styles`.`uuid` AS `uuid`,
//     concat(
//         '"',
//         `oxid_r2g_corr`.`styles`.`selector`,
//         '":[',
//         group_concat(
//             concat(
//                 '{"style":"',
//                 `oxid_r2g_corr`.`styles`.`row`,
//                 '","value":"',
//                 `oxid_r2g_corr`.`styles`.`value`,
//                 '"}'
//             ) separator ','
//         ),
//         ']'
//     ) AS `selectorrow`
// from
//     `oxid_r2g_corr`.`styles`
// group by
//     `oxid_r2g_corr`.`styles`.`uuid`,
//     `oxid_r2g_corr`.`styles`.`selector`

// VIEW v_cookies
// select
//     `v_stylerows`.`hostname` AS `hostname`,
//     `v_stylerows`.`created_at` AS `created_at`,
//     `v_stylerows`.`uuid` AS `uuid`,
//     concat(
//         '{',
//         group_concat(
//             `v_stylerows`.`selectorrow` separator ','
//         ),
//         '}'
//     ) AS `cookie`
// from
//     `oxid_r2g_corr`.`v_stylerows`
// group by
//     `v_stylerows`.`uuid`
