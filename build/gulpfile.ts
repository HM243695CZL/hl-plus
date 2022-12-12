import { series, parallel } from 'gulp';
import { withTaskName, run } from './utils'
import {genTypes} from './gen-types';
import {hlRoot, outDir} from './utils/paths';

const copySourceCode = () => async () => {
    await run(`cp ${hlRoot}/package.json ${outDir}/package.json`)
}

export default series(
    // @ts-ignore
    withTaskName('clean', () => run('rm -rf ./dist')),
    parallel(
        // @ts-ignore
        withTaskName('buildPackages', () =>
            run('pnpm run --filter @hl-plus/* --parallel build')
        ),
        withTaskName('buildFullComponent', () =>
            run('pnpm run build buildFullComponent')
        ), // 执行build命令时会调用rollup, 我们给rollup传递参数buildFullComponent 那么就会执行导出任务叫 buildFullComponent
        withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
    ),
    parallel(genTypes, copySourceCode())
)
export * from './full-component';
export * from './component';
