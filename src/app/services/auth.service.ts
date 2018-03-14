import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../domain/auth.model';

@Injectable()
export class AuthService {
    private readonly domain = 'users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
        '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

    constructor(private http: Http, @Inject('BASE_CONFIG') private config) {}

    // POST
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email': user.email}})
            .switchMap(res => {
                if(res.json().length > 0) {
                    throw new Error('用户已经存在!');
                }
                return this.http
                           .post(uri, JSON.stringify(user), {headers: this.headers})
                           .map(res => ({token: this.token, user: res.json() as User}));
            })
    }

    // POST
    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .get(uri, {params: {'email': username, 'password': password}})
            .map(res => {
                if(res.json().length === 0) {
                    throw new Error('用户不存在!');
                }
                return {token: this.token, user: res.json()[0] as User};
            });
    }

    // DELETE
    del(project: Project): Observable<Project> {
        const delTasks$ = Observable.from(project.taskLists? project.taskLists: [])
                .mergeMap(listId => this.http.delete(`${this.config.uri}/taskList/${listId}`))
                .count();
        return delTasks$.switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
                        .mapTo(project);
    }

    // GET
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
                .get(uri, {params: {'members_like': userId}})
                .map(res => res.json() as Project[]);
    }
}