document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const squares = document.querySelectorAll('.board div')
    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2, 1, 0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        placeApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 500
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(snakeMove, intervalTime)

    }

    function snakeMove(){ 
        if( // if hits border or itself
            (currentSnake[0] + width >= (width * width) && direction === width) || // bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || // right
            (currentSnake[0] % width === 0 && direction === -1) || // left
            (currentSnake[0] - width < 0 && direction === -width) || // top
            squares[currentSnake[0] + direction].classList.contains('snake') // itself
        ){
            alert('You lost!')
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            placeApple()
            score++
            scoreDisplay.innerText = score
            clearInterval(interval)
            intervalTime *= speed
            interval = setInterval(snakeMove, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')

    }

    function placeApple(){
        do{    
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        
        squares[appleIndex].classList.add('apple')
    }

    function control(evt){
        squares[currentIndex].classList.remove('snake')

        switch(evt.keyCode){
            case 39: // right
                direction = 1 
                break
            case 38: // up
                direction = -width
                break
            case 37: // left
                direction = -1
                break
            case 40: // down
                direction = +width
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})
