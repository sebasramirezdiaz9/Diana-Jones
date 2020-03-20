
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#010101',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    },
    dom: {
        createContainer: true
    },
};
var records = localStorage.getItem("records");
records = JSON.parse(records);

if(records == null)
{
    records = [];
}

function lista()
{
    var aLenght = records.length;
    
    var tabla="<tr><th>Jugador</th><th>Score</th></tr>";

    for(var i in records)
    {
        var record = JSON.parse(records[i]);

        tabla += "<tr><td>"+record.name+"</td><td>"+record.score+"</td></tr>";
    }
    document.getElementById("table").innerHTML = tabla;
}
var game = new Phaser.Game(config);

        function preload ()
        {
            this.load.image('sky', 'assets/fondo.jpg');
            this.load.image('title', 'assets/record_title.png');
            this.load.html('tableRecord', './records.html');
            this.load.image('exit', 'assets/salir.png');
            lista();

        }

        function create ()
        {
            this.add.image(400, 300, 'sky');
            this.add.image(400, 120, 'title');
         
            var exit= this.add.image(728,48,'exit').setInteractive();
            
            var element = this.add.dom(400, 0).createFromCache('tableRecord');

            exit.on('pointerover', function () {
                this.setTint(0xcccccc);
    
             
                });
             exit.on('pointerout', function () { 
                    
                 this.clearTint();
                
                
             });
            exit.on('pointerdown', function(){
                location.assign("menu.html");
                
            }); 
            this.tweens.add({
                targets: element,
                y: 300,
                duration: 3000,
                ease: 'Power3'
            });

        }

        
   

      




        

