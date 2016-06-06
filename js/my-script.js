/**
 * Created by saan on 10/11/13.
 */
//Helper som setter en begrensning på antall iterasjoner som skal kjøres -- definer each med "each_upto" og 'this' 'antall iterasjoner (1,2,3,4)

//Slutt på helper

var skolekysssokere ={

        handlerData:function(resJSON){

            var templateSource   = $("#sokere-tabell").html(),

                template = Handlebars.compile(templateSource),

                sokerHTML = template(resJSON);

           $('#container-for-jsonexport').html(sokerHTML);
            console.log($("#sokere-tabell"))
        },
        loadApplicansData : function (){

            $.ajax({
               // url:"http://192.168.99.100:3000/applications",
                //url:"http://localhost/skolekyss/data/fara.json",
                url:"../data/fara.json",
                method:'get',
                success:this.handlerData

            });
            
        }
};

$(document).ready(function(){

    skolekysssokere.loadApplicansData();
});

function exporttoexcel() {

    $('#button').click(function() {

        var data = $('table tr:gt(0)').map(function() {
            return {
                _id:  $(this.cells[0]).text(),
                timestamp: $(this.cells[1]).text()
            };
        }).get();

        alert(JSON.stringify(data, null, 4))
         $.ajax({
             url:"http://desktop-ca3arsh:3000/",
             method:'post',
             data: JSON.stringify({data})
             //data:"[{'a':'2','a':'3'},{'a':'2','a':'3'}]"
         })

    });
    
}