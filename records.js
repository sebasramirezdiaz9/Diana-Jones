
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

var game = new Phaser.Game(config);

        function preload ()
        {
            this.load.image('sky', 'assets/fondo.jpg');
            this.load.image('title', 'assets/record_title.png');
            //this.load.html('tableRecord', './records.html');
            this.load.image('exit', 'assets/salir.png');

        }

        function create ()
        {
            this.add.image(400, 300, 'sky');
            this.add.image(400, 120, 'title');
            this.add.text(450, 185, "Score", { fontSize: '30px', fill: '#000' });
            this.add.text(250, 185, "Jugador", { fontSize: '30px', fill: '#000' });
            for(let i = 0; i<records.length; i++)
            {
                var record = JSON.parse(records[i]);
                this.add.text(450, (225 + (i*30)), record.score, { fontSize: '25px', fill: '#000' });
                this.add.text(250, (225 + (i*30)), record.name, { fontSize: '25px', fill: '#000' });
                if(i>5)
                {
                    break;
                }
            }
            var exit= this.add.image(728,48,'exit').setInteractive();
            
            //var element = this.add.dom(400, 0).createFromCache('tableRecord');

            exit.on('pointerover', function () {
                this.setTint(0xcccccc);
    
             
                });
             exit.on('pointerout', function () { 
                    
                 this.clearTint();
                
                
             });
            exit.on('pointerdown', function(){
                location.assign("menu.html");
                
            }); 
        }

        
   

      




        

