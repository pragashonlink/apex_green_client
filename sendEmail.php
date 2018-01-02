<?php
require("lib/phpmailer/PHPMailerAutoload.php");

function sendEmail($arr) {

    $email_response = array();

    $Body = "";
    $Body .= "First Name: ";
    $Body .= "<span>".$arr['firstname']."</span>";

    $Body .= "\n";
    $Body .= "Lastname: ";
    $Body .= "<span>".$arr['lastname']."</span>";

    $Body .= "\n";
    $Body .= "Address: ";
    $Body .= "<span>".$arr['full_address']."</span>";

    $Body .= "\n";
    $Body .= "City: ";
    $Body .= "<span>".$arr['city']."</span>";

    $Body .= "\n";
    $Body .= "Postcode: ";
    $Body .= $arr['postcode'];

    $Body .= "\n";
    $Body .= "Tel: ";
    $Body .= "<span>".$arr['telephone']."</span>";

    $Body .= "\n";
    $Body .= "Email: ";
    $Body .= "<span>".$arr['email']."</span>";

    $Body .= "\n";
    $Body .= "Ownership type: ";
    $Body .= $arr['occupancy'];

    $Body .= "\n";
    $Body .= "Required insulation type: ";
    $Body .= $arr['insulation'];

    $Body .= "\n";
    $Body .= "Property type: ";
    $Body .= $arr['property'];

    $Body .= "\n";
    $Body .= "Property Built (Approximately): ";
    $Body .= $arr['built'];

    $Body .= "\n";
    $Body .= "Number of bedrooms: ";
    $Body .= $arr['bedrooms'];

    $Body .= "\n";
    $Body .= "Primary Source of Heating: ";
    $Body .= $arr['heating'];

    $Body .= "\n";
    $Body .= "Income Related Benefits: ";
    $Body .= $arr['benefits'];

    $password = 'ApexGreen4371&&&';
    $email = "enquiry@apexgreen.co.uk";
    $from_email = "enquiry@apexgreen.co.uk";

    $mail = new PHPMailer();
    $mail->IsSMTP(); // telling the class to use SMTP

    $mail->Host= "mail.lcn.com"; // SMTP server
    $mail->SMTPAuth = true; // enable SMTP authentication
    #$mail->SMTPSecure = "ssl"; // sets the prefix to the servier
    $mail->Host = "mail.lcn.com"; // sets GMAIL as the SMTP server
    $mail->Port = 25; // set the SMTP port for the GMAIL server
    $mail->Username  = $email; // GMAIL username
    $mail->Password  = $password;// GMAIL password

    $mail->From = $from_email;
    $mail->FromName = "Apex Green";
    $mail->Subject = "Grant Enquiry -  ".$_POST['postcode']."";

    $mail->IsHTML(true);
    $mail->Body = nl2br($Body);

    $mail->AddAddress("enquiry@apexgreen.co.uk");
    $mail->AddAddress("enquiry@apexgreen.co.uk");
    //$mail->AddAddress("sahan.v@xcendant.com");

    $mail_to_admin = $mail->Send(); // send message

    /**** To user ****/
    $to = $arr["email"];
    $subject = " Your Grant Enquiry  -  ".$arr['postcode']." ";

    $message = "
    <strong>Dear ".$arr['firstname']."</strong>
    
    
    Thank you for the application for insulation via  apexgreen.co.uk  and we are pleased to inform you that your application has been processed successfully,

 &#9658; We are certified approved installer 
 &#9658; 25 Years guarantee for material & workmanship  
 &#9658; Your data will be protected by the data act 
 &#9658; Approved by 'TRUST MARK' government endorsed standard 
 &#9658; Well established installer 
 &#9658; Qualified technicians & staff 
 &#9658; Highest quality material is always used 
 &#9658; Excellent standard of quality & customer care 
 &#9658; Very competitive prices on homes not eligible for grants 

One of our energy assessors will be telephoning you within the course of the next few days to advise you of grant availability and to arrange a convenient time to carry out a free no obligation survey.    

Kind regards

<img src='http://apexgreen.co.uk/img/apex_logo.png' alt=''  width='200'>

http://www.apexgreen.co.uk 
Email:enquiry@apexgreen.co.uk 
0800 505 3236  <br>
    ";

    $mail->From = $from_email;
    $mail->FromName = "Apex Green";
    $mail->Subject = "Your Grant Enquiry - ".$arr['postcode']." ";

    $mail->IsHTML(true);
    $mail->Body = nl2br($message);

    $mail->ClearAllRecipients();
    $mail->AddAddress($arr["email"]);
    $mail_to_user = $mail->Send(); // send message

    if($mail_to_admin && $mail_to_user === TRUE) {
        $email_response['status'] = 'success';
    } else{
        $email_response['status'] = 'fail';
        $email_response['description'] = $mail->ErrorInfo;
    }

    return $email_response;
}
?>