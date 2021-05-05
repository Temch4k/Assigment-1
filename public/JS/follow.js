$(document).ready(() =>{				
    $("#follow-button").click(event => {
        if ($("#follow-button").text() == "Follow"){
            var userId = $('#ourUsername').text();
            $.post(`/user/${userId}/follow`,(results = {}) =>{
                let data = results.data;
                    if (data && data.success){
                        console.log("yes");
                    }
                    else{
                        console.log("try again");
                    }
            })
            // *** State Change: To Following ***      
            // We want the button to squish (or shrink) by 10px as a reaction to the click and for it to last 100ms    
            $("#follow-button").animate( 100, 'linear', function () {});
            
            // then now we want the button to expand out to it's full state
            // The left translation is to keep the button centred with it's longer width
            $("#follow-button").animate(600, 'linear', function () { 
            $("#follow-button").css("color", "#2EB82E");
            $("#follow-button").css("border-color", "#2EB82E");
            $("#follow-button").text("Following");
    
            // Animate the background transition from white to green. Using JQuery Color
            $("#follow-button").animate({
                backgroundColor: "#2EB82E",
                borderColor: "#2EB82E"
            }, 1000 );
            });
        }else{
            var userId = $('#ourUsername').text();
            $.post(`/user/${userId}/unfollow`,(results = {}) =>{
                let data = results.data;
                    if (data && data.success){
                        console.log("yes");
                    }
                    else{
                        console.log("try again");
                    }
            })

            // *** State Change: Unfollow ***     
            // Change the button back to it's original state
            $("#follow-button").animate(600, 'linear', function () { 
            $("#follow-button").text("Follow");
            $("#follow-button").css("color", "#3399FF");
            $("#follow-button").css("border-color", "#3399FF");
            });
        }
    }); 
  });