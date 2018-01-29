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

// !nocommit
print_r ( $config);
die;

$stmt = $pdo->prepare ( 'INSERT INTO styles (`hostname`, `uuid`, `selector`, `row`, `value`) VALUES (:hostname, :uuid, :selector, :row, :value)');
$result = ((int) $stmt->execute($mappings) ?: $stmt->errorCode());

echo $_GET['callback'] . '(' . json_encode(['result' => $result, 'selector' => $mappings['selector']]) . ')';

// -- DB VIEW
// SELECT uuid, CONCAT('{', GROUP_CONCAT(selectorrow), '}') as cookie FROM
// (
//     SELECT uuid, CONCAT('"', selector,'":[',GROUP_CONCAT(style), "]") as selectorrow
//     FROM (
//         SELECT uuid, selector, CONCAT('{"style":"', `row`, '","value":"', `value`,'"}') as style
//         FROM styles as stylerow
//     ) as stylerows
//     GROUP BY stylerows.selector
// ) as cookierows
// GROUP BY uuid
