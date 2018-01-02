<?php
require_once('connection.php');
require_once('sendEmail.php');
$response = array();
$con = mysqli_connect($host, $user, $password, $db);
// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Perform queries
$query = "INSERT INTO insulations
                    (
                        wall_insulation_type,
                        owner,
                        property_type,
                        roof_insulation_type,
                        propertyPeriod,
                        fuel_type,
                        benefits,
                        postcode,
                        forename,
                        surname,
                        phone,
                        email,
                        address,
                        town,
                        siteID)
                    VALUES (
                        '".$_POST['insulation']."',
                        '".$_POST['occupancy']."',
                        '".$_POST['property']."',
                        '".$_POST['bedrooms']."',
                        '".$_POST['built']."',
                        '".$_POST['heating']."',
                        '".$_POST['benefits']."',
                        '".$_POST['postcode']."',
                        '".$_POST['firstname']."',
                        '".$_POST['lastname']."',
                        '".$_POST['telephone']."',
                        '".$_POST['email']."',
                        '".$_POST['full_address']."',
                        '".$_POST['city']."',
                        '".$_POST['siteID']."'
                    )";


if ($con->query($query) === TRUE) {
    $mail_return = sendEmail($_POST);
    if($mail_return['status'] == 'success') {
        $response['status'] = 'success';
        //echo "success";
    } else {
        $response['status'] = 'error';
        $response['description'] = $mail_return['description'];
        //echo "error";
    };
} else {
    $response['status'] = 'error';
    $response['description'] = "Error: " . $query . "<br>" . $con->error;
    //echo "error";
    //echo "Error: " . $query . "<br>" . $con->error;
};
echo json_encode($response);
?>