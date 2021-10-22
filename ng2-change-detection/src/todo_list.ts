
import {Component,Input, ChangeDetectionStrategy, Output, EventEmitter, AfterViewChecked, ChangeDetectorRef} from "angular2/core";
import {TodoItem} from "./todo_item";
import {Todo} from "./todo";

@Component({
    selector: 'todo-list',
    // uncomment to switch to on-push mode
    // changeDetection: ChangeDetectionStrategy.OnPush,
    /**
     * Angular 有两种变更检测机制
     * default: Angular decides if the view needs to be updated by comparing all the template expression
     *  values before and after the occurrence of an event, for all components of the component tree
     *  检测所有 template 中用到的信息
     * OnPush: his works by detecting if some new data has been explicitly pushed into the component,
     *  either via a component input or an Observable subscribed to using the async pipe
     *  通过 @Input 或者 Observable 传入数据，或者 templste 上有 event 被触发。性能更好。
     *  容易出现不好找到的问题，如果 object 的 property 被改变, 最好用 immutable.js
     */

    // default: Angular decides if the view needs to be updated by comparing all the template expression values before and after the occurrence of an event, for all components of the component tree
    directives: [TodoItem],
    template: `<ul>
                    <li *ngFor="#todo of todos;">
                        <todo-item [todo]="todo" (toggle)="onToggle($event)"></todo-item>
                    </li>
               </ul>
               <button (click)="blowup()">Trigger Change Detection Loop</button>`
})
export class TodoList implements AfterViewChecked {

    @Input()
    todos: Array<Todo>;

    @Input()
    callback: Function;

    @Output()
    addTodo = new EventEmitter<Object>();

    clicked = false;

    /**
     * 利用 ChangeDetectorRef 实现屏蔽默认检测，每 5 秒手动检测
     * @param ref
     */
    // constructor(
    //     private ref: ChangeDetectorRef,
    // ) {
    //     ref.detach();
    //     setInterval(() => {
    //         this.ref.detectChanges();
    //     }, 5000);
    // }

    onToggle(todo) {
        console.log("toggling todo..");
        todo.completed = !todo.completed;

    }

    blowup() {
        console.log("Trying to blow up change detection...");
        this.clicked = true;
        this.addTodo.emit(null);
    }

    /**
     * error: xxx has changed after it was checked
     * develop 下会进行两次检测，在 AfterViewChecked 后还一此
     * product 下只有一次
     */
    ngAfterViewChecked() {
        if (this.callback && this.clicked) {
            console.log("changing status ...");
            this.callback(Math.random());
        }

    }

}