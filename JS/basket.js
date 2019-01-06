/*Nouran*/
//Arrow is used to check whether it's the left or the right arrow and move

    function Arrow(event) {

        //Assign event variable to the event or if undefined assign it to window.event
        event = event || window.event;
        //to check if the left arrow is clicked and the position is not less than 0
        if (event.keyCode == '37' && pos >= 0) {
            // left arrow
            pos -= movement;
            $("#basket").css({
                left: pos
            });
            //to check if the right arrow is clicked and the position doesn't exceed the window's width
        } else if (event.keyCode == '39' && pos <= window.innerWidth) {
            // right arrow
            pos += movement;
            $("#basket").css({
                left: pos
            });
        }

        setBoundary();

    }
    //BasketMouse is used to move the basket using the mouse instead of the keyboard
    function BasketMouse() {
        $(document).on('mousemove', function (event) {
            //updating the position to the mouse position
            pos = event.pageX;
            //updating the basket position with the mouse position
            $("#basket").css('left', event.pageX);

            setBoundary();

        });

    }


    function setBoundary() {
        //defining a variable named value that's the subtraction of the basket width from the window width
        //which is the outermost position the basket can go to  
        value = window.innerWidth - $("#basket").innerWidth();
        //if the position of the basket exceeds the window's width, equalize it to the preset value..
        if (pos > window.innerWidth) 
        {
           // alert(pos);
            pos = value;
            //alert(pos);

            
        }
        //if the pos is in minus, put the basket back to the zero position
        if (pos <= 0) {
            $("#basket").css({
                left: 0
            });
        } 
        //also if the position of the basket and the width of the basket is greater than the window's width, put the basket back to the outermost position
        else if ((pos + $("#basket").innerWidth()) > window.innerWidth) {
            $("#basket").css({
                left: value
            });
        }
    }
