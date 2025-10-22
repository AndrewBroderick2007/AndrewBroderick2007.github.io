var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var QuestionPool =
[
 "What is the derivative of ",
 "What is the indefinite integral of "
 ]

var variableComp =
[
 [
  "arcsin(x)",
  "arccos(x)",
  "arctan(x)",
  "-cos(x)",
  "ln(|sec(x)|)",
  "tan(x)",
  "-ln(|csc(x)+cot(x)|)",
  "-csc(x)",
  "sin(x)",
  "ln(|sec(x)+tan(x)|)",
  "sec(x)",
  "-cot(x)"
  ],
 [
 "sin(x)dx",
 "tan(x)dx",
 "sec²(x)dx",
 "csc(x)dx",
 "csc(x)cot(x)dx",
 "cos(x)dx",
 "sec(x)dx",
 "sec(x)tan(x)dx",
 "csc²(x)dx",
 "1÷(sqrt(1-x²))",
 "-1÷(sqrt(1-x²))",
 "1÷(1+x²)"
  ]
];

var Answers =
[
 [
  "1÷(sqrt(1-x²))",
  "-1÷(sqrt(1-x²))",
  "1÷(1+x²)",
  "sin(x)",
  "tan(x)",
  "sec²(x)",
  "csc(x)",
  "csc(x)cot(x)",
  "cos(x)",
  "sec(x)",
  "sec(x)tan(x)",
  "csc²(x)"
  ],
 [
  "-cos(x)+C",
  "ln(|sec(x)|)+C",
  "tan(x)+C",
  "-ln(|csc(x)+cot(x)|)+C",
  "-csc(x)+C",
  "sin(x)+C",
  "ln(|sec(x)+tan(x)|)+C",
  "sec(x)+C",
  "-cot(x)+C",
  "arcsin(x)",
  "arccos(x)",
  "arctan(x)"
  ]
];

var CorrectAnswer = 0;
var AnimFrame = 0;
var currentQuestion = [1,0];
var AnswerSet = [[1,0],[1,1],[1,2],[1,3]];

function fullscreencanvas()
{
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}


function render()
{
    ctx.fillStyle = "#050515";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    if(AnimFrame>0)
    {
        if(CorrectAnswer == 0)
        {
            ctx.fillStyle = "#00AA00";
        }
        else
        {
            ctx.fillStyle = "#AA0000";
        }
        ctx.fillRect(canvas.width*0.15,300,canvas.width*0.3,(canvas.height-300)*0.3);
        if(CorrectAnswer == 1)
        {
            ctx.fillStyle = "#00AA00";
        }
        else
        {
            ctx.fillStyle = "#AA0000";
        }
        ctx.fillRect(canvas.width*0.55,300,canvas.width*0.3,(canvas.height-300)*0.3);
        if(CorrectAnswer == 2)
        {
            ctx.fillStyle = "#00AA00";
        }
        else
        {
            ctx.fillStyle = "#AA0000";
        }
        ctx.fillRect(canvas.width*0.15,300+(canvas.height-300)*0.45,canvas.width*0.3,(canvas.height-300)*0.3);
        if(CorrectAnswer == 3)
        {
            ctx.fillStyle = "#00AA00";
        }
        else
        {
            ctx.fillStyle = "#AA0000";
        }
        ctx.fillRect(canvas.width*0.55,300+(canvas.height-300)*0.45,canvas.width*0.3,(canvas.height-300)*0.3);
        AnimFrame-=1;
        if(AnimFrame == 0)
        {
            let Question = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
            // Makes New Question:
            currentQuestion = [Question[0],Question[1]];
            CorrectAnswer = Math.floor(Math.random()*4);
            for(let i = 0;i<4;i++)
            {
                if(CorrectAnswer == i)
                {
                    AnswerSet[i] = [Question[0],Question[1]];
                }
                else
                {
                    let rn = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
                    let ItBeCopy = false;
                    for(let j = i-1;j>-1;j--)
                    {
                        if(rn[0] == AnswerSet[j][0] && rn[1] == AnswerSet[j][1] || rn[0] == Question[0] && rn[1] == Question[1])
                        {
                            ItBeCopy = true;
                            break;
                        }
                    }
                    while(ItBeCopy)
                    {
                        ItBeCopy = false;
                        rn = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
                        for(let j = i-1;j>-1;j--)
                        {
                            if(rn[0] == AnswerSet[j][0] && rn[1] == AnswerSet[j][1] || rn[0] == Question[0] && rn[1] == Question[1])
                            {
                                ItBeCopy = true;
                                break;
                            }
                        }
                    }
                    AnswerSet[i] = rn;
                }
            }
        }
    }
    else
    {
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(canvas.width*0.15,300,canvas.width*0.3,(canvas.height-300)*0.3);
        ctx.fillRect(canvas.width*0.55,300,canvas.width*0.3,(canvas.height-300)*0.3);
        ctx.fillRect(canvas.width*0.15,300+(canvas.height-300)*0.45,canvas.width*0.3,(canvas.height-300)*0.3);
        ctx.fillRect(canvas.width*0.55,300+(canvas.height-300)*0.45,canvas.width*0.3,(canvas.height-300)*0.3);
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = "30px serif";
    ctx.fillText(QuestionPool[currentQuestion[0]]+variableComp[currentQuestion[0]][currentQuestion[1]],canvas.width*0.5,150);
    ctx.fillText(Answers[AnswerSet[0][0]][AnswerSet[0][1]],canvas.width*0.3,300+(canvas.height-300)*0.15);
    ctx.fillText(Answers[AnswerSet[1][0]][AnswerSet[1][1]],canvas.width*0.7,300+(canvas.height-300)*0.15);
    ctx.fillText(Answers[AnswerSet[2][0]][AnswerSet[2][1]],canvas.width*0.3,300+(canvas.height-300)*0.6);
    ctx.fillText(Answers[AnswerSet[3][0]][AnswerSet[3][1]],canvas.width*0.7,300+(canvas.height-300)*0.6);
}

window.onload = function()
{
    fullscreencanvas();
    loop = setInterval(() => {
        render();
    }, 50);
    document.addEventListener('keydown', function(event){
        
    });
    window.addEventListener('resize', function(event) {
        fullscreencanvas();
    }, true);
    document.addEventListener('mousedown', function(event){
        mousex = event.offsetX;
        mousey = event.offsetY;
        if(AnimFrame != 0)
        {
            AnimFrame = 0;
            let Question = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
            // Makes New Question:
            currentQuestion = [Question[0],Question[1]];
            CorrectAnswer = Math.floor(Math.random()*4);
            for(let i = 0;i<4;i++)
            {
                if(CorrectAnswer == i)
                {
                    AnswerSet[i] = [Question[0],Question[1]];
                }
                else
                {
                    let rn = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
                    let ItBeCopy = false;
                    for(let j = i-1;j>-1;j--)
                    {
                        if(rn[0] == AnswerSet[j][0] && rn[1] == AnswerSet[j][1])
                        {
                            ItBeCopy = true;
                            break;
                        }
                    }
                    if(rn[0] == Question[0] && rn[1] == Question[1])
                    {
                        ItBeCopy = true;
                    }
                    while(ItBeCopy)
                    {
                        ItBeCopy = false;
                        rn = [Math.floor(Math.random()*2),Math.floor(Math.random()*12)];
                        for(let j = i-1;j>-1;j--)
                        {
                            if(rn[0] == AnswerSet[j][0] && rn[1] == AnswerSet[j][1])
                            {
                                ItBeCopy = true;
                                break;
                            }
                        }
                        if(rn[0] == Question[0] && rn[1] == Question[1])
                        {
                            ItBeCopy = true;
                        }
                    }
                    AnswerSet[i] = rn;
                }
            }
        }
        else
        {
            AnimFrame = 60;
        }
    });
}
