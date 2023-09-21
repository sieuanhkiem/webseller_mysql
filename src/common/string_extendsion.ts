String.prototype.formart = function (...arg: any[]) {
    return this.replace(/\{\d{1}\}/g, function (math: string, number: number) {
        let index: number = parseInt(math.replace('{', '').replace('}', ''));
        console.log(arg[index]);
        console.log(arg[number]);
        return arg[index];
    });
}