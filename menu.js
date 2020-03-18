
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#010101',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);

        function preload ()
        {
            this.load.image('sky', 'assets/fondo.jpg');
            this.load.image('title', 'assets/diana_jones.png');
            this.load.image('icon', 'assets/icon.png');
            this.load.spritesheet ('help','assets/btn2.png',{ frameWidth: 189, frameHeight: 44 });
            this.load.spritesheet ('play','assets/btn3.png',{ frameWidth: 189, frameHeight: 44 });
            this.load.image('records', 'assets/records2.png');
         
            this.load.image('icon2', 'assets/icono2.png');
            this.load.image('exit', 'assets/salir.png');


        }

        function create ()
        {
            this.add.image(400, 300, 'sky');
            this.add.image(400, 120, 'title');
            this.add.image(150, 400, 'icon');
            this.add.image(590, 400, 'icon2');
         
           
            var play = this.add.sprite(400,260, 'play').setInteractive();
            var help= this.add.sprite(400,340, 'help').setInteractive();

            var records= this.add.image(400,420,'records').setInteractive();
            var exit= this.add.image(728,48,'exit').setInteractive();
         
        

            play.on('pointerover', function () {
                this.setTint(0xcccccc);

             
            });
            play.on('pointerout', function () { 
                
                this.clearTint();
            });
           play.on('pointerdown',(()=>{
            
            location.assign("play.html");
            

           })); 



           help.on('pointerover', function () {
            this.setTint(0xcccccc);

         
            });
            help.on('pointerout', function () { 
                
                this.clearTint();
            
            
            });
            help.on('pointerdown', function(){
                
            location.assign("ayuda.html");

            }); 

            records.on('pointerover', function () {
                this.setTint(0xcccccc);
    
             
                });
             records.on('pointerout', function () { 
                    
                 this.clearTint();
                
                
             });
            records.on('pointerdown', function(){
                    
             location.assign("");
    
            }); 

            exit.on('pointerover', function () {
                this.setTint(0xcccccc);
    
             
                });
             exit.on('pointerout', function () { 
                    
                 this.clearTint();
                
                
             });
            exit.on('pointerdown', function(){
                    window.close();
                
            }); 


          

            
        }

        
   

      




        

