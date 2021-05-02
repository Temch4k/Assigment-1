$(document).ready(() => {
    $(".follow-button").click(event => {
        let $button = $(event.target),
            username = $button.data("username");
        console.log(`/api/user/${username}/follow`)
        $.get(`/api/user/${username}/follow`, (results = {}) => {
            let data = results.data;
            if (data && data.success){
                $button
                .text("Joined")
                .addClass("followed-button")
                .removeClass("follow-Button");
            }
            else{
                $button.text("Try again");
            }
        });
    });
});