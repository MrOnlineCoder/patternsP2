
class File {
    constructor(name, ext, size) {
        this.name = name;
        this.ext = ext;
        this.size = size;
        this.isComposite = false;
    }

    // toString(level = 0) {
    //     return `${" . ".repeat(level)} ${this.name}.${this.ext}\n`;
    // }

    accept(visitor, ...args) {
        return visitor.visitFile(this, ...args);
    }
}

class Folder {
    constructor(name) {
        this.elements = [];
        this.name = name;
        this.isComposite = true;
    }

    add(element) {
        this.elements.push(element);
        return this;
    }

    remove(element) {
        const index = this.elements.indexOf(element);
        if (index > -1)
            this.elements.splice(element, 1);
        return this;
    }

    // toString(level = 0) {
    //     let result = `${" . ".repeat(level)} > ${this.name}\n`;
    //     for (let file of this.files)
    //         result += file.toString(level + 1);
    //     return result;
    // }

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
        return folder.elements.reduce(
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
        for (let element of folder.elements)
            result += element.accept(this, level + 1);
        return result;
    }
}

class FileRemoveVisitor {
    constructor(ext) {
        this.ext = ext;
    }
    
    visitFile(file) {
        file.size = 0;
    }

    visitFolder(folder) {
        for (let i = folder.elements.length - 1; i >= 0; i--) {
            const element = folder.elements[i];
            element.accept(this);
            if (!element.isComposite && element.ext == this.ext) {
                console.log(`file ${element.name}.${element.ext} was removed`);
                folder.remove(element);
            }
        }
    }
}

export { File, Folder, SizeVizitor, PrintVisitor, FileRemoveVisitor };