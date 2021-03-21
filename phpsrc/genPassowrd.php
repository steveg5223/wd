<?php
/**
 * We just want to hash our password using the current DEFAULT algorithm.
 * This is presently BCRYPT, and will produce a 60 character result.
 *
 * Beware that DEFAULT may change over time, so you would want to prepare
 * By allowing your storage to expand past 60 characters (255 would be good)
 */
$password = $_GET['password'];
$password_hash = password_hash($_GET['password'], PASSWORD_DEFAULT);
echo $_GET['password'] . '<br />';
echo 'hash: ' . $password_hash . '<br /><br />';

echo 'does ' . $password_hash . ' match $2y$10$VAouT3Jztgp3FuI89nTlreyG4bAAQ8iNYNGv1WdAabfA2zkLgsrKy ? <br />';
$password_match = password_verify($password, '$2y$10$VAouT3Jztgp3FuI89nTlreyG4bAAQ8iNYNGv1WdAabfA2zkLgsrKy');
print_r(password_match ? 'yes' : 'no');