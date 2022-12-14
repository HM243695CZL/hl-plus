import { spawn } from 'child_process';
import { projectRoot } from './paths';
// @ts-ignore
export const withTaskName = <T>(name: string, fn: T) => Object.assign(fn, {
    displayName: name });
// 在node使用子进程来运行脚本
export const run = async (command: string) => {
    // rf -rf
    return new Promise((resolve) => {
        const [cmd, ...args] = command.split(' ');

        // execa这些库
        const app = spawn(cmd, args, {
            cwd: projectRoot,
            stdio: 'inherit', // 直接将这个子进程的输出
            shell: true, // 默认情况下 linux 才支持 rm -rf （我再电脑里安装了git bash）
        });
        app.on('close', resolve);
    });
};

export const pathRewriter = (format)=>{
    return (id:string) => {
        id = id.replace(/@hl-plus/g, `hl-plus/${format}`);
        return id
    }
}
