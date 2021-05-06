
class File {
    constructor(name, ext, size) {
        this.name = name;
        this.ext = ext;
        this.size = size;
        this.isComposite = false;
    }

    toString(level = 0) {
        return `${" . ".repeat(level)} ${this.name}.${this.ext}\n`;
    }

    accept(visitor, ...args) {
        return visitor.visitFile(this, ...args);
    }
}

class Folder {
    constructor(name) {
        this.files = [];
        this.name = name;
        this.isComposite = true;
    }

    add(file) {
        this.files.push(file);
        return this;
    }

    remove(file) {
        const index = this.files.findIndex(f => file.name === f.name);
        if (index > -1)
            this.files.splice(index, 1);
        return this;
    }

    toString(level = 0) {
        let result = `${" . ".repeat(level)} > ${this.name}\n`;
        for (let file of this.files)
            result += file.toString(level + 1);
        return result;
    }

    accept(visitor, ...args) {
        return visitor.visitFolder(this, ...args);
    }
}

class SizeVizitor {
    visitFile(file) {
        return file.size;
    }

    visitFolder(folder) {
        // let total = 0;
        // for (let element of folder.files){
        //     total += element.accept(this);
        // }
        // return total;
        return folder.files.reduce(
            (total, element) => total + element.accept(this),
            0
        )
    }
}

class PrintVisitor {
    visitFile(file, level = 0) {
        return `${" . ".repeat(level)} ${file.name}.${file.ext}\n`
    }

    visitFolder(folder, level = 0) {
        let result = `${" . ".repeat(level)} > ${folder.name}\n`;
        for (let file of folder.files)
            result += file.accept(this, level + 1);
        return result;
    }
}

class FileRemoveVisitor {
    constructor(ext) {
        this.ext = ext;
    }
    visitFile(file) {
        if (file.ext === this.ext) {
            console.log(`file ${file.name}.${file.ext} was removed`);
        }
    }

    visitFolder(folder) {
        folder.files.forEach(
            element => element.accept(this)
        );
        folder.files = folder.files.filter(
            element => element.isComposite || element.ext != this.ext
        )
    }

}

export { File, Folder, SizeVizitor, PrintVisitor, FileRemoveVisitor };