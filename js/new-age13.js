(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    });

    $('.go-next').each(function(){
        $(this).on('click', function(e){
            var validation = $(this).attr('data-validate');
            var elType = $(this).attr('data-element');
            var error_msg = $(this).parent().prev();
            if(checkValid(validation, elType) === true) {
                error_msg.hide();
                $(this).parent().parent().removeClass('current').next().addClass('current');
            } else {
                console.log('invalid');
                error_msg.show();
            }
            e.preventDefault();
            return false;
        });
    });

    $('.nav-btn-left').each(function(){
        $(this).on('click', function(e){
            $(this).parent().parent().removeClass('current').prev().addClass('current');
            e.preventDefault();
            return false;
        });
    });

    //Postal Code
    $('#lookup_field').setupPostcodeLookup({
        api_key: 'ak_j5hz1c19ViM1A6nA39PhumNvRd0uM',//ak_j5hz1c19ViM1A6nA39PhumNvRd0uM
        output_fields: {
            line_1: '#first_line',
            line_2: '#second_line',
            line_3: '#third_line',
            post_town: '#post_town',
            postcode: '#postcode'
        },
        button_class: 'btn btn-primary postcode-btn',
        input_class: 'form-control postcode-input'
    });

    $('input[name="email"]').on('blur', function () {
        validateEmailAddress();
    });

    $('input[name="firstname"]').on('blur', function () {
        validateFirstName();
    });

    $('input[name="lastname"]').on('blur', function () {
        validateLastName();
    });

    $('input[name="telephone"]').on('blur', function () {
        validateTelephone();
    });


    //Ajax
    $('#submit').on('click', function (e) {
        var errorMsg = $(this).parent().prev();
        $('#final-error').hide();

        if(validateFirstName() && validateLastName() && validateTelephone() && validateEmailAddress()) {

            var formData = {
                insulation : $("input[name='insulation']:checked").val(),
                occupancy : $("input[name='occupancy']:checked").val(),
                property : $("input[name='property']:checked").val(),
                bedrooms : $("input[name='bedrooms']").val(),
                built : $("input[name='built']:checked").val(),
                heating : $("input[name='heating']:checked").val(),
                benefits : $("input[name='benefits']:checked").val(),
                postcode : $("#postcode").val(),
                firstname : $("input[name='firstname']").val(),
                lastname : $("input[name='lastname']").val(),
                telephone : $("input[name='telephone']").val(),
                email : $("input[name='email']").val(),
                full_address : $("#idpc_dropdown option:selected").text(),
                city : $("#post_town").val(),
                siteID : $("input[name='siteID']").val()
            };

            var submit = $('#submit');

            console.log(formData);
            console.log(formData.full_address);

            $.ajax({
                type: 'POST',
                url: 'formProccess.php',
                data: formData,
                beforeSend: function(){
                    submit.attr('disabled', 'disabled');
                    submit.text('Please wait...');
                },
                success: function(response) {
                    submit.removeAttr('disabled');
                    submit.text('Apply now!');
                    console.log(response);
                    if(response == 'success') {
                        //alert(response);
                        $('.final').addClass('success');
                        $('#final-form').hide();
                        $('#response').show();
                        $('#final-error').hide();
                        $('.response-text').html("We have successfully received your enquiry for insulation grants! <br>One of our approved energy assessor will call you within 36 hours to arrange free energy assessment");
                    } else {
                        $('.final').addClass('error');
                        $('#final-error').show();
                    }
                }
            });
        }
        e.preventDefault();
        return false;
    });

    $("#reset").on('click', function () {
        $('.final').removeClass('current').removeClass('success');
        $('.cards:first-child').addClass('current');
    })
})(jQuery); // End of use strict

function checkValid(validation, elementType) {
    var returnVal = false;
    if(validation != '') {
        console.log($(validation));
        switch (elementType){
            case 'radio':
                returnVal = $(validation).length != 0;
            break;

            case 'select':
                var selectVal = $(validation).val();
                returnVal = (selectVal != 'ideal' && typeof selectVal !== "undefined");
                console.log($(validation).val());
                console.log('return in select: '+returnVal);
            break;

            default:
                var el = validation.split(',');
                console.log(el);
                var val;
                var elm;
                for(var i = 0; i < el.length; i++) {
                    elm = $.trim(el[i]);
                    val = $(elm).val();
                    returnVal = (val != '' && typeof val !== "undefined");
                    console.log(i+' - '+elm);
                    console.log($(elm).val());
                    console.log('return in default: '+returnVal);
                }
            break;
        }
    }
    //console.log(returnVal);
    return returnVal;
}

function validateEmailAddress() {
    var emailField = $('input[name="email"]'),
        emailVal = $.trim($(emailField).val()),
        emailError = $(emailField).next();
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    if(emailVal == '') {
        emailError.text('Email is required');
        $(emailField).parent().addClass('has-error');
        emailError.show();
        return false;
    } else if(pattern.test(emailVal) === false) {
        emailError.text('Email is invalid');
        $(emailField).parent().addClass('has-error');
        emailError.show();
        return false;
    } else {
        emailError.hide();
        $(emailField).parent().removeClass('has-error');
        return true;
    }
}

function validateFirstName() {
    var firstNameField = $('input[name="firstname"]'),
        firstNameVal = $.trim($(firstNameField).val()),
        firstNameError = $(firstNameField).next();

    if(firstNameVal == '') {
        firstNameError.text('First name is required');
        $(firstNameField).parent().addClass('has-error');
        firstNameError.show();
        return false;
    } else if(!isNaN(firstNameVal)) {
        firstNameError.text('First name is invalid');
        $(firstNameField).parent().addClass('has-error');
        firstNameError.show();
        return false;
    } else if(firstNameVal.length < 2) {
        firstNameError.text('First name should be more than 2 characters long');
        $(firstNameField).parent().addClass('has-error');
        firstNameError.show();
        return false;
    } else {
        firstNameError.hide();
        $(firstNameField).parent().removeClass('has-error');
        return true;
    }
}

function validateLastName() {
    var lastNameField = $('input[name="lastname"]'),
        lastNameVal = $.trim($(lastNameField).val()),
        lastNameError = $(lastNameField).next();

    if(lastNameVal == '') {
        lastNameError.text('Last name is required');
        $(lastNameField).parent().addClass('has-error');
        lastNameError.show();
        return false;
    } else if(!isNaN(lastNameVal)) {
        lastNameError.text('Last name is invalid');
        $(lastNameField).parent().addClass('has-error');
        lastNameError.show();
        return false;
    } else if(lastNameVal.length < 2 ) {
        lastNameError.text('Last name should be more than 2 characters long');
        $(lastNameField).parent().addClass('has-error');
        lastNameError.show();
        return false;
    } else {
        lastNameError.hide();
        $(lastNameField).parent().removeClass('has-error');
        return true;
    }
}

function validateTelephone() {
    var telephoneField = $('input[name="telephone"]'),
        telephoneVal = $.trim($(telephoneField).val()),
        telephoneError = $(telephoneField).next();

    if(telephoneVal == '') {
        telephoneError.text('Telephone number is required');
        $(telephoneField).parent().addClass('has-error');
        telephoneError.show();
        return false;
    } else if(isNaN(telephoneVal)) {
        telephoneError.text('Telephone number is invalid');
        $(telephoneField).parent().addClass('has-error');
        telephoneError.show();
        return false;
    } else if(telephoneVal.length != 11) {
        telephoneError.text('Length of the telephone number is incorrect.');
        $(telephoneField).parent().addClass('has-error');
        telephoneError.show();
        return false;
    } else {
        telephoneError.hide();
        $(telephoneField).parent().removeClass('has-error');
        return true;
    }
}