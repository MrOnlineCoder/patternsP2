import { Book, Song, BookWidget, SongWidget } from "./2_5_0_no_bridge";
const SmallWidgetMixin = (WidgetSuperclass) => class extends WidgetSuperclass {
    get template() {
        return `<h5 class="small-widge>${this.cutString(this.title, 10)}</h5>`
    }
}

const MiddleWidgetMixin = (WidgetSuperclass) => class extends WidgetSuperclass {
    get template() {
        return `<div class="middle-widget"> <h3> ${this.title}</h3><p> ${this.cutString(this.description, 20)}</p></div>`;
    }
}

const BigWidgetMixin = (WidgetSuperclass) => class extends WidgetSuperclass {
    get template() {
        return `<div class="big-widget"> <h3> ${this.title}</h3><p> ${this.description}</p></div>`;
    }
}

class SongSmallWidgetWithMixin extends SmallWidgetMixin(SongWidget) { };
class SongMiddleWidgetWithMixin extends MiddleWidgetMixin(SongWidget) { };
class SongBigWidgetWithMixin extends BigWidgetMixin(SongWidget) { };
class BookSmallWidgetWithMixin extends SmallWidgetMixin(BookWidget) { };
class BookMiddleWidgetWithMixin extends MiddleWidgetMixin(BookWidget) { };
class BookBigWidgetWithMixin extends BigWidgetMixin(BookWidget) { };

export { SongSmallWidgetWithMixin, SongMiddleWidgetWithMixin, SongBigWidgetWithMixin, BookBigWidgetWithMixin, BookMiddleWidgetWithMixin, BookSmallWidgetWithMixin};
