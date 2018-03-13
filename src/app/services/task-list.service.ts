import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project, TaskList, Task } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskList';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // POST
    add(taskList: TaskList) {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(taskList), {headers: this.headers})
            .map(res => res.json());
    }

    // PUT
    update(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
            desc: taskList.desc,
            coverImg: taskList.coverImg
        }
        return this.http
            .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
            .map(res => res.json());
    }

    // DELETE
    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/taskLists/${taskList.id}`;
        return this.http.delete(uri)
                .mapTo(taskList);
    }

    // GET
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .get(uri, {params: {'projectId': projectId}})
                .map(res => res.json() as TaskList[]);
    }

    // 调换任务列表的顺序
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http
                .patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers})
                .map(res => res.json());
        const drop$ = this.http
                .patch(dragUri, JSON.stringify({order: src.order}), {headers: this.headers})
                .map(res => res.json());
        return Observable.concat(drag$, drop$).reduce((arrs, list) => [...arrs, list], []);
    }
}