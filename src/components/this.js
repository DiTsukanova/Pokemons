const obj = {
    f() {
        const obj2 = {
            g() {
                const q = () => {
                    const t = () => {
                        console.log(this);
                    }
                    const obj3 = {
                        y() {
                            t();
                        }
                    }
                    obj3.y();
                }
                q();
            }
        }

        obj2.g();
    }
}

obj.f(); // f → g → q → y → t → console.log


//Если функция стрелочная - ищем ближайшаю функцию обычную, в которой ОБЪЯВЛЕНА!!! стрелочная 

//Если функция обычная - то this определяется в момент вызова