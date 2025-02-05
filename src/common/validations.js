export function isCedula(num) {
    if (num.length == 10) {
        let sum = 0;
        let cedula = num.split("");
        for (let i = 0; i < cedula.length; i++) {
            let temp = parseInt(cedula[i]);
            if (i % 2 == 0) {
                if (temp * 2 > 9) {
                    sum += temp * 2 - 9;
                } else {
                    sum += temp * 2;
                }
            } else {
                sum += temp;
            }
        }
        if (sum % 10 == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
