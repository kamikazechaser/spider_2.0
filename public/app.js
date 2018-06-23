$(document).ready(() => {
    $("#notestable").DataTable();

    $("input[name='todo']").on("click", (event) => {
        const checkbox = $(`#${event.target.id}`);

        checkbox.toggleClass("strike");

        const statusCheck = checkbox[0].className.split(" ").pop();

        if (statusCheck === "strike") {
            return $.get("/api/updatetodo", { tick: true, id: event.target.id });
        } else {
            return $.get("/api/updatetodo", { tick: false, id: event.target.id });
        }
    });


    $("td span:contains('Personal')").addClass('label-success');
    $("td span:contains('Work')").addClass('label-info');
    $("td span:contains('Misc.')").addClass('label-warning');

    $("span[name='deletetodo']").on("click", (event) => {
        const elementId = event.target.parentElement.children["0"].id.split("");
        const fixDigits = elementId.filter(int => parseInt(int) == int );
        const todoId = fixDigits.join("");

        return $.get(`/api/deletetodo/${todoId}`).then(() =>{
            location.reload();
        });
    });

    $("span[name='deletenote']").on("click", (event) => {
        const elementId = event.target.id.split("");
        const fixDigits = elementId.filter(int => parseInt(int) == int );
        const noteId = fixDigits.join("");

        return $.get(`/api/deletenote/${noteId}`).then(() =>{
            location.reload();
        });
    });

    $("#signout").on("click", (event) => {
        return $.get("/signout").then(() => {
            location.reload();
        });
    });
});