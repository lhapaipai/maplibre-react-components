# Import alias

n'utiliser l'alias d'import que pour les tests ?

# Tests

on utilise jsdom@^22 et canvas@~2.10.0

car les versions supérieures de jsdom requièrent canvas 2.11.4 qui entraine une erreur pnpm

```console
ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL  Command was killed with SIGBUS (Bus error due to misaligned, non-existing address or paging error): vitest src/components/RMap.test.ts
```

Config qui marchait sûr.
┌──────────────────────────────┬─────────┬────────┐
│ Package                      │ Current │ Latest │
├──────────────────────────────┼─────────┼────────┤
│ canvas (dev)                 │ 2.10.2  │ 2.11.2 │
├──────────────────────────────┼─────────┼────────┤
│ @testing-library/react (dev) │ 15.0.7  │ 16.0.0 │
├──────────────────────────────┼─────────┼────────┤
│ eslint (dev)                 │ 8.57.0  │ 9.6.0  │
├──────────────────────────────┼─────────┼────────┤
│ jsdom (dev)                  │ 22.1.0  │ 24.1.0 │
└──────────────────────────────┴─────────┴────────┘

## Questions

est-ce que cela vaut la peine de memoiser RMap alors que de toute façon il aura des enfants et la props `children` sera différente à chaque rendu ce qui entrainera un re rendu de RMap.
