"use strict";

document.addEventListener("DOMContentLoaded", () => {
    //wait until DOM is fully loaded
    document.getElementById('darkModeSwitchButton').addEventListener('click', darkModeToggle);

    // grab menu selector buttons
    const menuButtons = document.querySelectorAll('.menu-selector button');
    for (let i = 0; i < menuButtons.length; i++) {
        //calls changeItem() when a menu button is clicked
        menuButtons[i].addEventListener('click', function() {
            changeItem(i);
        })
    }

    // game button event listener
    const guessButton = document.getElementById('guessButton');
    guessButton.addEventListener('click', randomNumber);

    // display the first item
    changeItem(0);

    //form event listener
    const form = document.getElementById("form");
    document.getElementById('form').addEventListener('submit', validateForm);
});

// menu selector 
function changeItem(index) {
    const selectItems = document.querySelectorAll(".select-item");
    const itemDetails = document.querySelectorAll(".item-detail");

    // loop through menu items and add active class if the item matches the current index #, remove active class if not.
    for (let i=0; i<selectItems.length; i++) {
        if(i=== index) {
            selectItems[i].classList.add("active");
        }
        else {
            selectItems[i].classList.remove("active");
        }
    }

    // do the same for the item-details
    for(let i=0;i<itemDetails.length; i++) {
        if (i===index) {
            itemDetails[i].classList.add("active");
        }
        else {
            itemDetails[i].classList.remove("active");
        }
    }
}

// game
function randomNumber() {
    const userEntry = parseInt(document.getElementById("userNumber").value);

    //generates a random number from 1-10.
    const randomNumber = Math.floor(Math.random() * 10 + 1);

    //checks to see if the user entered number matches the randomly generated number.
    if (userEntry === randomNumber) {
        document.getElementById("gameResult").innerHTML = "<p>You Win!</p>";
        document.getElementById("winningNumber").innerHTML = "<p>And the winning number was: </p>" + randomNumber + "!";
    }
    else {
        document.getElementById("gameResult").innerHTML = "<p>You Lost.</p>";
        document.getElementById("winningNumber").innerHTML = "<p>But the winning number was: </p>" + randomNumber + ".";
    }
    document.getElementById("yourGuess").innerHTML = "<p>You Guessed: </p>" + userEntry;
}

// dark mode
function darkModeToggle() {
    //grabs all elements
    const elements = document.querySelectorAll('*');
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const logo = document.getElementById('logo');

    //adds or removes dark-mode class based on if it was already present or not.
    //changes the logo and dark-mode switch color to maintain visibility.
    for (let i=0; i<elements.length; i++) {
        if (elements[i].classList.contains('dark-mode')) {
            elements[i].classList.remove('dark-mode');
            darkModeSwitch.src = 'images/SunAndMoon.png';
        }
        else {
            elements[i].classList.add('dark-mode');
            darkModeSwitch.src = 'images/SunAndMoonDarkMode.png';
            logo.src = 'images/NutriZoomLogoDarkMode.png';
        }
    }
}

// form validation
function validateForm(event) {
    event.preventDefault();

    //grab form inputs
    const fName = document.getElementById("firstName");
    const lName = document.getElementById("lastName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const nameRegex = /^[A-Za-z']*[A-Za-z][A-Za-z' ]*$/; //checks that at least one letter is present and allows letters, apostrophes, and spaces.
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; //checks for email format (starts with letters, contains @ and a period, and a TLD of 2-6 characters).
    const phoneRegex = /^(\(\d{3}\)-\d{3}-\d{4}|\d{10})$/; // checks for a 10 digit sequence or 000-000-000 format.

    //remove any existing error styles
    fName.classList.remove("error");
    lName.classList.remove("error");
    phone.classList.remove("error");
    email.classList.remove("error");

    //remove any existing errors visible next to form inputs
    fName.nextElementSibling.classList.add("hidden");
    lName.nextElementSibling.classList.add("hidden");
    phone.nextElementSibling.classList.add("hidden");
    email.nextElementSibling.classList.add("hidden");

    let isValid = true;

    //compare user inputs to regular expressions
    // adds error class and 
    if (!nameRegex.test(fName.value)) {
        isValid = false;
        fName.classList.add("error");
        fName.nextElementSibling.classList.remove("hidden");
    }

    if (!nameRegex.test(lName.value)) {
        isValid = false;
        lName.classList.add("error");
        lName.nextElementSibling.classList.remove("hidden");
    }

    if (!emailRegex.test(email.value)) {
        isValid = false;
        email.classList.add("error");
        email.nextElementSibling.classList.remove("hidden");
    }

    if (!phoneRegex.test(phone.value)) {
        isValid = false;
        phone.classList.add("error");
        phone.nextElementSibling.classList.remove("hidden");
    }

    // submit form if valid
    if (isValid) {
        document.getElementById("form").submit();

        // clear form inputs
        fName.value = "";
        lName.value = "";
        email.value = "";
        phone.value = "";

        //hide any error messages
        fName.nextElementSibling.classList.add("hidden");
        lName.nextElementSibling.classList.add("hidden");
        email.nextElementSibling.classList.add("hidden");
        phone.nextElementSibling.classList.add("hidden");
    }
}