/**
 * This is a developement only file for testing types.
 */
import type { Plugin as RollupPlugin } from 'rollup'
import type { Equal, ExpectExtends, ExpectTrue } from '@type-challenges/utils'
import type { EnvironmentPlugin, PluginContextExtension } from '../plugin'
import type { ROLLUP_HOOKS } from '../constants'
import type {
  GetHookContextMap,
  NonNeverKeys,
  RollupPluginHooks,
} from '../typeUtils'

type EnvironmentPluginHooksContext = GetHookContextMap<EnvironmentPlugin>
type EnvironmentPluginHooksContextMatched = {
  [K in keyof EnvironmentPluginHooksContext]: EnvironmentPluginHooksContext[K] extends PluginContextExtension
    ? never
    : false
}

type HooksMissingExtension = NonNeverKeys<EnvironmentPluginHooksContextMatched>
type HooksMissingInConstans = Exclude<
  RollupPluginHooks,
  (typeof ROLLUP_HOOKS)[number]
>

export type cases = [
  // Ensure environment plugin hooks are superset of rollup plugin hooks
  ExpectTrue<ExpectExtends<RollupPlugin, EnvironmentPlugin>>,

  // Ensure all Rollup hooks have Vite's plugin context extension
  ExpectTrue<Equal<HooksMissingExtension, never>>,

  // Ensure the `ROLLUP_HOOKS` constant is up-to-date
  ExpectTrue<Equal<HooksMissingInConstans, never>>,
]

export {}
