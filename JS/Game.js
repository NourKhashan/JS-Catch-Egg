var userName = "", // User name
    userScore = 0, // User Score
    timer,
    seconds,
    countDown,
    flagMode,
    eggs_images,
    /*For Moving Basket*/
    movement = 50,
    pos = 300;


function storeUserName(userName) {
    'use strict';
    // To Store Data
    var count = 1,
        flag = false,
        value;
    for (value in localStorage) {
        if (value == userName) { // Check if user Loged before or not

            flag = true; //Then set Flag to true(Logined Before)
        }

        if (count == localStorage.length) { // Check if we reach All users login
            break;
        }
        count++;
    }
    if (!flag) { // New User

        localStorage.setItem(userName, "0"); // Store User Data
        userScore = 0;
    } else {
        $('#userScore span').text(localStorage[userName]);
        userScore = parseInt(localStorage[userName]);
    }
    count = 1;

}; // Store Data of user name  


function startGame() {
    'use strict';
    // Eggs Falling
    if (flagMode == 'normal') {
        seconds = 120; //number of seconds
        eggs_images = ['black.png', 'white.png', 'gold.png'];
    } else {
        seconds = 60; //number of seconds
        eggs_images = ['white.png'];
    }

    // Start Timer
    timer = document.getElementById('timer'); //timer span
    countDown = setInterval(function () {
        secondPass();

    }, 1000);
    // End Timer

    MoveEggs(); //Eggs Moving
    /*Basket Controlling*/
    BasketMouse();
    document.onkeydown = Arrow;

    // ٍShow Pause
    $("#pause").removeClass('showHideConfirm');
    $('#start').addClass('showHideConfirm');
    $('#reset').addClass('showHideConfirm');
}

function secondPass() {
    var minutes = Math.floor(seconds / 60);
    remSeconds = seconds % 60;
    if (remSeconds < 10) {
        remSeconds = '0' + remSeconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    timer.innerHTML = minutes + ":" + remSeconds;

    if (seconds > 0) {
        seconds--;
    } else {
        timerEnded(); // If timer Finished

    }
}; //secondPass 


function timerEnded() { // When Timer Ended
    'use strict';
    clearInterval(countDown); // Stop Timer
    $("#confirm").toggleClass("showHideConfirm"); // Toggle class to hide show confir windows when lose
    // Set Span With initial Time

    $("#userNameConfirm").text(userName.split(flagMode)[0]); // To get Orginal User name without easy or normal word

    // Add UserName

    stopAllAnimation(); //Stop Animation

    if (parseInt(localStorage[userName]) <= 0) { // If Score <=0
        $('#gameOver').text('GAMEOVER');
        $("#score> span").text(localStorage[userName]); // Score of user
        localStorage[userName] = 0;

    } else { // If Score >0
        $('#gameOver').text('Well Done');
        $("#score> span").text(localStorage[userName]); // Score of user
    }
} // Timer Ended


function checkEggWithBasket(eggNumber) { // Calculate if egg hit basket or not
    basketLeft = $('#basket').offset().left; // Basket Left
    basketWidth = $('#basket').width(); // Basket Width
    basketRight = basketLeft + basketWidth; // Basket Right

    eggLeft = $('#img' + eggNumber).offset().left; // Egg Left
    eggWidth = $('#img' + eggNumber).width(); // Egg Width
    eggRight = eggLeft + eggWidth; // Egg Right

    if (eggLeft >= basketLeft && eggRight <= basketRight) { // Egg within Basket Boundary
        return true;
    } else { // Egg oustSide Basket Boundary
        return false;
    }


} // End Egg hitting

function getScore(eggType) {

    if (eggType == 'white.png') {
        userScore += 1;

    } else if (eggType == 'black.png') {
        userScore -= 10;
    } else {
        userScore += 3;
    }
    if (userScore <= 0) { // If Score <=0 Then Player lose Game 
        localStorage[userName] = userScore;
        timerEnded(); // Stop Game


    }
    return userScore;
} // Return Score of Eggs

function loginIntoGame() { //Click on Login button
    'use strict';

    userName = $("#userNameLogin").val().toLowerCase(); // Get Name from textBox
    $("#userInputName").toggleClass("showHideConfirm"); // Show Login Div
    $("#gamePage").toggleClass("showHideConfirm"); // Show Game Div
    $("#userName span").text(
        $("#userNameLogin").val()
    ); //Show UserName on Game

    // Set Span With initial Time
    if (flagMode == 'normal') {
        $('#timer').text('02:00');
        userName += 'normal';
    } else {
        $('#timer').text('01:00');
        userName += 'easy';
    }
    storeUserName(userName); //Storing Data of Use
    $('#img1').remove();
    $('#img2').remove();
    $('#img3').remove();
}

function MoveEggs() {
    MoveEgg1();
    MoveEgg2();
    MoveEgg3();
} // Move Eggs 

function MoveEgg1() {
    img1 = $("<img  id='img1'src=''/>");
    imgSrc1 = eggs_images[Math.floor(Math.random() * eggs_images.length)];
    //-------------------egg1-----------------------
    $("#egg1").append(img1);
    $('#img1').css({
        width: 30,
        height: 30,
        top: 70,
        position: 'absolute',
        left: Math.floor(Math.random() * 700),
        zIndex: 1,
    });
    $('#img1').attr('src', '../Images/' + imgSrc1).show();
    animateEgg1(); // Animate Egg 1
} // Move Egg1 

function MoveEgg2() {
    //------------------egg2-----------------------
    img2 = $("<img  id='img2' src=''/>");
    imgSrc2 = eggs_images[Math.floor(Math.random() * eggs_images.length)];
    $("#egg2 ").append(img2);
    $('#img2').css({
        width: 30,
        height: 30,
        top: 50,
        position: 'absolute',
        left: Math.floor(Math.random() * 700),
        zIndex: 1,
    });
    $('#img2').attr('src', '../Images/' + imgSrc2).show();

    animateEgg2(); // Animate Egg 2
} // Move Egg2 


function MoveEgg3() {
    img3 = $("<img  id='img3'src=''/>");
    imgSrc3 = eggs_images[Math.floor(Math.random() * eggs_images.length)];
    $("#egg3").append(img3);

    $('#img3').css({
        width: 30,
        height: 30,
        top: 90,
        position: 'absolute',
        left: Math.floor(Math.random() * 700),
        zIndex: 1,
    }); // Change Egg Properties
    $('#img3').attr('src', '../Images/' + imgSrc3).show(); // ٍShow Egg

    animateEgg3(); // Animate Egg3
} // Move Egg3 

function animateEgg3() {

    $('#img3').animate({
        top: "92%"
    }, {
        duration: 5000,

        step: function (now) { // Walaa

            if (Math.floor(now) == 92) {
                $('#imgBroken').show(); // To display Broken egg using show function // Show Broken Image
                setTimeout(function () {
                    $('#imgBroken').hide();
                }, 800); // Waiting 800 Milly Sec then hide the broken egg
                $('#imgBroken').css('left', $('#img3').css('left')); // Set broken Image at the position of Egg
            } else if (Math.floor(now) >= 87 && Math.floor(now) <= 89) { // To chech if egg hit basket
                if (checkEggWithBasket(3)) {
                    userScore = getScore(imgSrc3); // Calcualte Score
                    localStorage[userName] = userScore; // Set Score to User
                    $('#userScore span').text(userScore); // Set Score to Span
                    $('#img3').stop(true, false); // Stop Animation of Img3
                    $('#img3').remove(); // Remove Image from Span
                    if (userScore > 0) {
                        MoveEgg3(); // Start Animation Again
                    }

                }

            }

        },
        complete: function () {
            $('#img3').remove(); // Remove Image from Span
            MoveEgg3(); // Start Animation Again


        }
    }); // Animate Egg
} // End Egg3 Animation 

function animateEgg2() {
    $('#img2').animate({
        top: '92%'
    }, {
        duration: 8000,
        step: function (now) { //Walaa

            if (Math.floor(now) == 92) { // To display Broken egg
                $('#imgBroken').show();
                setTimeout(function () {
                    $('#imgBroken').hide();
                }, 800);
                $('#imgBroken').css('left', $('#img2').css('left'));
            } else if (Math.floor(now) >= 87 && Math.floor(now) <= 89) { // To chech if egg hit basket
                if (checkEggWithBasket(2)) {
                    userScore = getScore(imgSrc2);
                    localStorage[userName] = userScore;
                    $('#userScore span').text(userScore);
                    $('#img2').stop(true, false);
                    $('#img2').remove();
                    if (userScore > 0) { // If Score <=0

                        MoveEgg2();
                    }

                }

            }

        },
        complete: function () {
            $('#img2').remove();
            MoveEgg2();


        }
    });
} //End Egg2 Animation 


function animateEgg1() {

    $('#img1').animate({
        top: '92%',
    }, {

        duration: 7000,
        step: function (now) { //Walaa
            if (Math.floor(now) == 92) { // To display Broken egg

                $('#imgBroken').css('left', $('#img1').css('left')).show();
                setTimeout(function () {
                    $('#imgBroken').hide();
                }, 800);

            } else if (Math.floor(now) >= 87 && Math.floor(now) <= 89) { // To chech if egg hit basket
                if (checkEggWithBasket(1)) {
                    userScore = getScore(imgSrc1);
                    localStorage[userName] = userScore;
                    $('#userScore span').text(userScore);
                    $('#img1').stop(true, false);
                    $('#img1').remove();
                    if (userScore > 0) {

                        MoveEgg1();
                    }

                }

            }

        },
        complete: function () {
            $('#img1').remove();
            MoveEgg1();
        }
    });
} //End Egg1 Animation

function stopAllAnimation() {
    'use strict';
    // Stop All Eggs
    $('#img3').stop();
    $('#img2').stop();
    $('#img1').stop();
    // Stop Basket Mouse  Moving  
    $(document).off('mousemove');
    document.onkeydown = ""; // Stop Keyboard Effects on basket

} // Stop All Animation 


function resumeAllAnimation() {
    'use strict';
    // Resume Egg Moving by Playing animation Again
    animateEgg3();
    animateEgg2();
    animateEgg1();

    // Enable mouseMove on Basket
    BasketMouse();
    document.onkeydown = Arrow; // Enable Keyboard Effects on basket
} // Resume Animations 


$(function () {
    'use strict';

    // Easy mode
    $("input[value=Easy]").on("click", function () {
        'use strict';
        flagMode = 'easy'
        $("#MainPage").toggleClass("showHideConfirm"); // Hide Main Page
        $("#userInputName").toggleClass("showHideConfirm"); // Show User Name Login
    });

    // Normal mode
    $("input[value=Normal]").on("click", function () {
        'use strict';
        flagMode = 'normal'
        $("#MainPage").toggleClass("showHideConfirm"); // Hide Main Page
        $("#userInputName").toggleClass("showHideConfirm"); // Show User Name Login
    });

    //Button Login
    $("#btnlogin").on("click", function () {
        'use strict';
        loginIntoGame();



    }); // Btn Login


    //Start Game 
    $("#start").on("click", function () {
        'use strict';
        startGame();
    });
    
    //Reset Score
    $("#reset").on("click", function () {
        'use strict';
         localStorage.setItem(userName, "0"); // Store User Data
         userScore = 0;
         $('#userScore span').text(localStorage[userName]);
    });

    // Pause
    $('#pause').on({
        'click': function () {
            'use strict';
            //1- Pause Timer
            clearInterval(countDown); //Pause
            $('#pauseResumeDiv').toggleClass("showHideConfirm"); // Toggle class to hide show confir windows when lose

            //2- Stop Animation
            stopAllAnimation();


        }
    }); // Pause Game

    // Resume
    $('#resume').on({
        'click': function () {
            'use strict';

            $('#pauseResumeDiv').toggleClass("showHideConfirm"); // Toggle class to hide show confirm windows when lose
            //1- Resume Timer
            countDown = setInterval(function () { // Resume Timer
                secondPass();

            }, 1000); // Timer End

            //2- Play Animation
            resumeAllAnimation();
        } //On click


    }); //Rseume Game

    // Confirm
    $(".playAgain, .home, #resume").on({
        "mouseover mouseout": function () {
            'use strict';
            $(this).toggleClass("btnColor"); // Toggle Class to change color when move on/out button 

        } // MouseOver MouseOut

    }); //End Button Action 


    // Play Again
    $(".playAgain").on({
        "click": function () {
            'use strict';
            //To check which Div I will Display Pause or GameOver Div
            if (!$('#confirm').hasClass("showHideConfirm")) {
                $("#confirm").addClass("showHideConfirm"); // Toggle class to hide show confirm windows when lose
            }

            if (!$('#pauseResumeDiv').hasClass("showHideConfirm")) {
                $('#pauseResumeDiv').addClass("showHideConfirm"); // To hide Pasue Resume Div
            }

            startGame(); // Calling Start Game Function 
            if (userScore <= 0) { // Check Score if <=0 then Set it to 0
                localStorage[userName] = "0"; // Store User Score to 0
                userScore = 0;
                $('#userScore span').text(userScore); // Display 0 score on Span

            }

            $('#start').addClass('showHideConfirm'); // To show Start Button again
            $('#reset').addClass('showHideConfirm'); // To show Start Button again
        } // Click
    }); // Plag Again Button


    // Home
    $(".home").on({
        "click": function () {
            'use strict';
            $('#userInputName, #gamePage, #confirm, #pauseResumeDiv').addClass("showHideConfirm"); // Toggle class to hide show confirm windows when lose

            //Show Main Page
            $('#MainPage').removeClass("showHideConfirm");

            // Hide Pause
            $("#pause").addClass('showHideConfirm');

            // Enable show on Start Button
            $('#start').removeClass('showHideConfirm');
            $('#reset').removeClass('showHideConfirm');
        } // Click
    }); // Home Button


}); // Loading
