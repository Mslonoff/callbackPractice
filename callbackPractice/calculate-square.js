function calculateSquare(number, callback) {
    setTimeout(function() {
        if (typeof number !== 'number') {
            callback(new Error('Argument of type number is expected'));
            return;
        }
        const result = number * number;
        callback(null, result);
    }, 1000);
}

module.exports = calculateSquare;
// export default calculateSquare;


//////// rewritten with promise /////////////////

function calculateSquare(number) {
    const promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (typeof number !== 'number') {
                return reject(new Error('Argument of type number is expected'));
            }
            const result = number * number;
            resolve(result);
        }, 1000);
    });
    return promise;
};

calculateSquare(2)  // this would work
    .then(value => {
        console.log('Success: ' + value);
    }, reason => {
        console.log('Error: ' + reason);
    }
    );

    calculateSquare('string')  // this would return error reason ('Argument of type number is expected')
    .then(value => {
        console.log('Success: ' + value);
    }, reason => {
        console.log('Error: ' + reason);
    }
    );