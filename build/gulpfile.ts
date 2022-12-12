import { series, parallel } from 'gulp';
import { withTaskName, run } from './utils'

export default series(
    // @ts-ignore
    withTaskName('clean', () => run('rm -rf ./dist')),
    parallel(
        // @ts-ignore
        withTaskName("buildPackages", () =>
            run("pnpm run --filter @hl-plus/* --parallel build")
        )
    )
)
