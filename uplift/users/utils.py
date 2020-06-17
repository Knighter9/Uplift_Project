from flask import jsonify


def verify_registration(**kwargs):
    # get the arguments passed in
    arg_dict = locals()
    error_dict = {}
    special_char_selection = "!&$#*-_"
    number = 0
    special_char = 0
    upper_case = 0
    if arg_dict["kwargs"]["route"] == "register":
        # counting the number of special chars numbers and uppercase letters in the password
        for i in arg_dict["kwargs"]["password"]:
            if i.isalpha():
                if i.isupper():
                    print("There is an uppercase character")
                    upper_case += 1

            elif i in special_char_selection:
                special_char += 1

            elif i.isdigit():
                number += 1

        # checking to see if the password is a strong password
        if number < 1 or special_char < 1 or upper_case < 1:
            print("this should work")
            error_dict[
                "password_strength"
            ] = f"The password must contain and uppercase letter a number and one of these special characters{special_char_selection}"
        # checking to see if the password fields match
        if arg_dict["kwargs"]["password"] != arg_dict["kwargs"]["password_confirm"]:
            error_dict["password_equality"] = f"Error The password fields must match"

        # checking to see if the password is longer than 10 characters
        if len(arg_dict["kwargs"]["password"]) < 10:
            error_dict[
                "password_length"
            ] = "The password length must be more than 10 characters"

        # checking to see if the fields are filled out
        for i in arg_dict["kwargs"]:
            if arg_dict["kwargs"][i] == "" or arg_dict["kwargs"][i] == None:
                print("There was an empty field")
                error_dict[i] = f"Error the {i} field must not be filled out"

        if len(error_dict) > 0:
            error_dict["success"] = False
            print(error_dict)
            return error_dict

        else:
            return True
