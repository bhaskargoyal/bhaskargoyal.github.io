$('document').ready(function(){

    
    // loader loaded
    $.fn.animateRotate = function(angle, duration, easing, complete) {
      return this.each(function() {
        var $elem = $(this);
        $({deg: 0}).animate({deg: angle}, {
          duration: duration,
          easing: easing,
          step: function(now) {
            $elem.css({
               transform: 'translate(-50%, -50%) rotate(' + now + 'deg)'
    
             });
          },
          complete: complete || $.noop
        });
      });
    };
    $('#sun_main').animateRotate(180*50,1800*50,"easeOutQuart");


    // All things are loaded , remove loader, call function start
    $(window).load(function(){
        $("#sun_mainAlt,#fence_with_bird,#bird,#fence,#fence2,#cloud1,#cloud2,#cloud3,#cloud4,#cloud5").hide();
        $("#main").css({});
        $('#menu,.aside,#door_aside_wrap,#home,#door').animate(
            {
                width:'0'
            },0,function(){
                $(this).hide(0, function(){
                    $('#loader-wrapper').fadeOut('slow',function() {
                        $(this).delay(500).remove();
                        start();                        
                    });
                });    
            }
        );
        
    });



    //////////////////////
    ////////START.........
    //////////////////////
   
      
    function start(){
        
        $("#main").fadeIn(1000);
        mainLoaded();
             
        
        
    }
    
    
    //////////////////////
    ////////Main Loaded.........
    //////////////////////
    
    
    function mainLoaded(){
    
        $("#sun_mainAlt").fadeIn(1000).animateRotate2(1000000,10000000,"linear",function(){}); 
        $("#fence_with_bird,#fence,#fence2,#bird,#cloud1,#cloud2,#cloud3,#cloud4,#cloud5").show();  
        $("#fence").delay(500).animate({bottom: "0%"},{duration : 2000,easing: "easeOutBounce"});
        $("#fence_with_bird").delay(500).animate({bottom: "0%"},{duration : 2000,easing:  "easeOutBounce"});
        $("#bird").delay(500).animate({bottom: "14.6666%"},{duration : 2000,easing:  "easeOutBounce"});
        $("#fence2").delay(500).animate({ bottom: "0%"},{duration : 2000,easing:  "easeOutBounce"});
        $("#cloud1").delay(500).animate({marginTop : "5%"},{duration : 2000,easing: "swing"});
        $("#cloud2").delay(500).animate({marginTop : "15%"},{duration : 2000,easing: "swing"});
        $("#cloud3").delay(500).animate({marginTop : "10%"},{duration : 2000,easing: "swing"});
        $("#cloud4").delay(500).animate({marginTop : "16%"},{duration : 2000,easing: "swing"});
        $("#cloud5").delay(500).animate({marginTop : "15%"},{duration : 2000,easing: "swing"});
        
        

        
        $("#fence_with_bird").mouseenter(function() {
        
            $("#bird").animate({transform: "rotate(-50deg)"},100,function(){
                $(this).delay(200).animate({transform: "rotate(-3deg)"},100,function(){
                    $(this).delay(200).animate({transform: "rotate(-50deg)"},100,function(){
                        $(this).delay(200).animate({transform: "rotate(-3deg)"},100,function(){
                
                        });
                    });
                });
            });
        });
       
        
        $("#fence").mouseenter(function() {
            $(this).effect( "shake", 600 );
        });
        


         $("#fence2").on("click",function(){
        // $("#fence2").ready(function(){
            $('#main').animate(
                {
                    width:'toggle'
                },0,function(){
                    $('#main').hide();    
                }
            );
            $('#menu').show().animate(
                {
                    
                },400,function(){    
                }
            );
            // $('#home').show().animate(
            //     {width:'23.3333%'
            //     },400,function(){  
            //     }
            // );
        });
        //  var color;

        // $('.circle').mouseenter(function() {
        //     color = $(this).css("background");
        //     $(this).animate({backgroundColor: "#FFF"}, 0, function(){});
        // });
        // $('.circle').mouseout(function() {
        //     $(this).animate({backgroundColor: color}, 0, function(){});
        // });
        $(function() {
            var str= "Bhaskar Goyal";
            $('#name-text').css({dispaly: "block"});
            var split = str.split("");
            var counter = 0;
            $("#name-text").text("");
            setTimeout(function() {
                var SInametext = setInterval(function() {
                    
                    $('#name-text').append(split[counter]);
                    counter ++;
                    if(counter>= str.length) {
                        clearInterval(SInametext);
                    }
                },140);
            }, 1000);
        });
        $(function() {
            var str= "Work in Progress";
            $('#status').css({dispaly: "block"});
            var split = str.split("");
            var counter = 0;
            $("#status").text("");
            setTimeout(function() {
                var SInametext = setInterval(function() {
                    
                    $('#status').append(split[counter]);
                    counter ++;
                    if(counter>= str.length) {
                        clearInterval(SInametext);
                    }
                },140);
            }, 1000);
        });
        
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $.fn.animateRotate2 = function(angle, duration, easing, complete) {
      return this.each(function() {
        var $elem = $(this);
        

        $({deg: 0}).animate({deg: angle}, {
          duration: duration,
          easing: easing,
          step: function(now) {
            $elem.css({
               transform: 'rotate(' + now + 'deg)'
               
             });
            
          },
          complete: complete || $.noop
        });
      });
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // $("#door_aside_wrap").click(function() {
    //     $( "#door_aside_wrap" ).accordion({
                
    //     });
    // });
    $( "#door_aside_wrap" ).accordion({
        heightStyle: "content" ,
        active: 2
    });
   
    
    
    $(function() {
        $('#menu').on("click", function() {
            $('#menu').animate(
                {
                    width: '0px'    
                }, 0, function() {
                    $(this).hide();
                }
            );
            $('#home').show().animate(
                {
                    width: '33.333%'
                }, 400, function(){}
            );
        });
    });
    
    $('#menu-button').on('click', function() {
        $('#home,.aside,#door,#door_aside_wrap').animate(
            {width:'0'
            },200,function(){
                $("#home,.aside,#door,#door_aside_wrap").hide();
                
            }
        );
        $('#menu').show().animate(
            {},200,function(){
                                
            }
        );
    });
    $('#home').on("click",function(){
        $('#home').animate(
            {width:'toggle'
            },200,function(){
                $(this).hide();
                
            }
        );
        $('.aside').show().animate(
            {width:'23.3333%'
            },400,function(){
                
            }
        );
        
        $('#door').show().animate(
            {width: "8.33333%"
            },{duration: 800, easing: "easeInOutBack"}
        );
        $('#door_aside_wrap').show().animate(
            {width: "1.66666%"
            },800
        );
        
    });
    
    $('#door').on("click",function(){
            $('#menu,.aside,#door_aside_wrap,#home,#door').animate(
            {width:'0'
            },0,function(){
                $(this).hide();    
            }
        ); 
        $('#main').fadeIn(2000);
        mainLoaded();
    });
    
});