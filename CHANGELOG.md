# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.2](https://github.com/5cube/vue-supp/compare/v0.8.1...v0.8.2) (2021-05-08)


### Bug Fixes

* **activator:** set reference on activator props ([f8ee241](https://github.com/5cube/vue-supp/commit/f8ee241154b7a5339d6f7b0aae8a81c387293f5a))





## [0.8.1](https://github.com/5cube/vue-supp/compare/v0.8.0...v0.8.1) (2021-05-08)


### Bug Fixes

* **activator:** added refrence prop to context ([4400709](https://github.com/5cube/vue-supp/commit/4400709db1c7c3c5f57c0cf4a4214304872c741c))
* **activator:** focusActivator options ([1e1babc](https://github.com/5cube/vue-supp/commit/1e1babc2d0168eddd81c478ee22ce6b1d0547482))
* **activator:** modelValue prop type ([9290e31](https://github.com/5cube/vue-supp/commit/9290e31ade7a446411b3e5ea37d0241bcef173b6))
* **clientRect:** props type ([32db1fa](https://github.com/5cube/vue-supp/commit/32db1faba29d5e58655a0a2874c9e9bdba66a1c4))
* **group:** props type & max prop type ([09eaa8e](https://github.com/5cube/vue-supp/commit/09eaa8eb729f73189b754c78e327c5b3e21542a0))
* **popper:** create & destroy methods ([6de5f62](https://github.com/5cube/vue-supp/commit/6de5f62395e3008279884ef51c0d44db076a3166))
* **popper:** instance, options type ([89c6135](https://github.com/5cube/vue-supp/commit/89c61354a9fd90d5c9c2ebee2d8b57340e289122))
* **transition:** removed genTransition ([7d065ee](https://github.com/5cube/vue-supp/commit/7d065ee7b9ee9c8a49e0f45966db795e79a5c1bc))
* **transition:** transition prop type ([600e352](https://github.com/5cube/vue-supp/commit/600e3524fb5a9dcaf2244157191e688db332a193))
* SetupContext replaced by Slots & EmitFn ([6518ac5](https://github.com/5cube/vue-supp/commit/6518ac5b2a1e75e2b93a1a15358d79f51300e2f8))
* **transition:** use props default value ([38cf0c4](https://github.com/5cube/vue-supp/commit/38cf0c4122eac7afabeb1e3c5f49e79a35a5d8c7))





# [0.8.0](https://github.com/5cube/vue-supp/compare/v0.7.6...v0.8.0) (2021-05-06)


### Bug Fixes

* **dimensions:** useDimensionProps type ([f2b7349](https://github.com/5cube/vue-supp/commit/f2b734975ab14ad87926cc4c6414221a07331915))
* **lazyContent:** isActive type ([9ea4798](https://github.com/5cube/vue-supp/commit/9ea47986154a5583ca481806223ecfc53cc7bd34))
* removed custom SetupContext & EmitFn types ([ad92970](https://github.com/5cube/vue-supp/commit/ad9297056965ad04265201ac9c4bd46ebf317270))
* **dimensions:** refactored ([63bcf01](https://github.com/5cube/vue-supp/commit/63bcf013302c8a25c0501b7abc334a0ad77eae75))
* **lazyContent:** props refactored ([2afabc5](https://github.com/5cube/vue-supp/commit/2afabc5cc3b58a78ca9ac23e5cec58d6af50815e))
* props types ([be17768](https://github.com/5cube/vue-supp/commit/be1776859a537e2aeb72f00c7bcab1fef1cf8af0))


### Features

* added model use ([0a14918](https://github.com/5cube/vue-supp/commit/0a14918db46b64f61890bde6d4d34bdbb8db1eac))
* added resizeObserver use ([c5276aa](https://github.com/5cube/vue-supp/commit/c5276aa94c616666a2911c792fb113c9babfac9b))
* added transition use ([005f39e](https://github.com/5cube/vue-supp/commit/005f39ec48112e0e24e42007fa7a00fc2a6b1c39))
* popper simplified with watchEffect ([0c48046](https://github.com/5cube/vue-supp/commit/0c48046acca0b8ce4836a124a428bf92036eb9ae))


### BREAKING CHANGES

* options and modifiers should be passed manually
* **dimensions:** removed factory function

useDimensionsProps -> useDimensionsProp
useDimensions -> useDimension
dimensionsStyles -> dimensionStyles
* **lazyContent:** isActive moved from props to context
* removed toggle use, should be replaced by useModel





## [0.7.6](https://github.com/5cube/vue-supp/compare/v0.7.5...v0.7.6) (2021-03-12)


### Reverts

* activator modelValue access Date ([31df25c](https://github.com/5cube/vue-supp/commit/31df25cedc2ba4e729db822a04a05b49f56e410c))





## [0.7.5](https://github.com/5cube/vue-supp/compare/v0.7.4...v0.7.5) (2021-03-09)


### Bug Fixes

* activator modelValue access Date ([6218ca9](https://github.com/5cube/vue-supp/commit/6218ca9593f5ae17813de071d323229798daaaa6))
* updated README.md ([143c239](https://github.com/5cube/vue-supp/commit/143c239d57ec16efb7dbb8900c3532a3cb316129))





## [0.7.4](https://github.com/5cube/vue-supp/compare/v0.7.3...v0.7.4) (2021-03-08)


### Bug Fixes

* **clientRect:** DOMRectReadOnly type ([675bfdb](https://github.com/5cube/vue-supp/commit/675bfdb1f3f9127d457ec94898003ef25c36b525))
* **filter:** filter prop type ([12fc2e2](https://github.com/5cube/vue-supp/commit/12fc2e20718a32360cabd50117d6471509a03c97))
* **popper:** create args types ([6c1851c](https://github.com/5cube/vue-supp/commit/6c1851c13b7255f8214b55e4b39fbe3a28c7284b))
* **popper:** genBox type ([d4d1ff4](https://github.com/5cube/vue-supp/commit/d4d1ff47bf524045c8d5c2e6517ddabf4d866f3a))
* custom SetupContext type ([8da8336](https://github.com/5cube/vue-supp/commit/8da83360c4420f8874381b6a06c771d0ed9fc28c))
* lazyContent interfaces ([f144ee5](https://github.com/5cube/vue-supp/commit/f144ee52314a11c4de32d267fc722e4d6e3d8a1e))
* ref types ([98029d4](https://github.com/5cube/vue-supp/commit/98029d4b524e989ea69f90cec5408cc9f718c104))
* SetupContext interface picks ([134197e](https://github.com/5cube/vue-supp/commit/134197ee199212bee34bfe3b39f2513d301d671a))





## [0.7.3](https://github.com/5cube/vue-supp/compare/v0.7.2...v0.7.3) (2021-02-04)


### Bug Fixes

* activator prop type ([f7e925c](https://github.com/5cube/vue-supp/commit/f7e925c980a1f298c14995136b4692fa02e1a64c))


### Reverts

* target es5 & minify ([4a7cc40](https://github.com/5cube/vue-supp/commit/4a7cc403c5b2889469d2fbec07519a11bca10015))





## [0.7.2](https://github.com/5cube/vue-supp/compare/v0.7.1...v0.7.2) (2021-02-03)


### Bug Fixes

* **build:** target es5 & minify ([92d7458](https://github.com/5cube/vue-supp/commit/92d7458aae47f680628af31d0cd246e1be5995f0))





## [0.7.1](https://github.com/5cube/vue-supp/compare/v0.7.0...v0.7.1) (2021-01-20)


### Bug Fixes

* refactor ([98ea329](https://github.com/5cube/vue-supp/commit/98ea329e934705765b298e07bd36962491b4fd94))





# [0.7.0](https://github.com/5cube/vue-supp/compare/v0.6.0...v0.7.0) (2021-01-20)


### Features

* added replaceAt util ([448c67d](https://github.com/5cube/vue-supp/commit/448c67d7acccdada76c0c6881ed74052693b3723))





# [0.6.0](https://github.com/5cube/vue-supp/compare/v0.5.6...v0.6.0) (2021-01-20)


### Features

* added utils folder to index ([d6f0fd8](https://github.com/5cube/vue-supp/commit/d6f0fd8dfef46e41d514db2bbeacd328baf9de7a))





## [0.5.6](https://github.com/5cube/vue-supp/compare/v0.5.5...v0.5.6) (2021-01-03)


### Bug Fixes

* elementRect -> clientRect ([e5417ed](https://github.com/5cube/vue-supp/commit/e5417edeaa120266f86be55b2e81f1221d1b3311))
* vue version updated v3.0.5 ([6e0611b](https://github.com/5cube/vue-supp/commit/6e0611b25b93f6e1f5ea87cccf3f0d97b0eefd79))





## [0.5.5](https://github.com/5cube/vue-supp/compare/v0.5.4...v0.5.5) (2020-12-28)


### Bug Fixes

* activator element select on nested slot ([76bb5e2](https://github.com/5cube/vue-supp/commit/76bb5e2f0ec2340f5b2ea5e34964df718f55b01c))
* utils refactored ([dd5010a](https://github.com/5cube/vue-supp/commit/dd5010adff1a63114ccff7813364b87dfa7b944b))





## [0.5.4](https://github.com/5cube/vue-supp/compare/v0.5.3...v0.5.4) (2020-12-24)


### Bug Fixes

* rollup config ([8c35c68](https://github.com/5cube/vue-supp/commit/8c35c68ade84cada33c0c1d8fc38ab26bf63b25c))
* toUnit -> convertToUnit ([98bfc16](https://github.com/5cube/vue-supp/commit/98bfc16082b91391bc75815eebfb7e361ac890cc))
* util/ -> utils/ ([8b873d8](https://github.com/5cube/vue-supp/commit/8b873d8e2d1cc6cbcff240bca9308a013e6ed9b5))





## [0.5.3](https://github.com/5cube/vue-supp/compare/v0.5.2...v0.5.3) (2020-12-23)


### Bug Fixes

* Ref -> ComputedRef type ([7438b32](https://github.com/5cube/vue-supp/commit/7438b32fc5c5fd86f278afc162aa3c8aafe6ec09))





## [0.5.2](https://github.com/5cube/vue-supp/compare/v0.5.1...v0.5.2) (2020-12-22)


### Bug Fixes

* updated readme ([a40df78](https://github.com/5cube/vue-supp/commit/a40df78ece5b58fe6339e3e0191b0b0b08d2ebe9))
* **build:** rollup config ([e36cd23](https://github.com/5cube/vue-supp/commit/e36cd23d62c925a235d306b8b9f68873c0abaf31))





## [0.5.1](https://github.com/5cube/vue-supp/compare/v0.5.0...v0.5.1) (2020-12-22)


### Bug Fixes

* **build:** tsconfig.json target es5 ([7207e14](https://github.com/5cube/vue-supp/commit/7207e147e3311e6665532f5a910c9db39edfc6ca))





# [0.5.0](https://github.com/5cube/vue-supp/compare/v0.4.0...v0.5.0) (2020-12-22)


### Bug Fixes

* vue-supp package version ([41c2b7a](https://github.com/5cube/vue-supp/commit/41c2b7a27c74fb516df31922787c3d7961d848bb))
* **lib:** removed vite ([0c0687b](https://github.com/5cube/vue-supp/commit/0c0687bbe61ac56b121f70a539d6d72ce6abdc65))
* **vue-supp:** installed eslint & jest ([ffa3afa](https://github.com/5cube/vue-supp/commit/ffa3afae24db42ba85e654882e0c6dfd901672be))


### Features

* add playground package ([41b05e1](https://github.com/5cube/vue-supp/commit/41b05e1e7b7d7ec09b40633c81ef3d36baaade46))
* added directives ([85b07a0](https://github.com/5cube/vue-supp/commit/85b07a0f50da22c58c338b004c87f5eb2a9940af))





# [0.4.0](https://github.com/5cube/vue-supp/compare/v0.3.0...v0.4.0) (2020-12-18)


* fix!: udpated changlog ([e131ace](https://github.com/5cube/vue-supp/commit/e131ace5c20d04dbd3d56114d972acba793e0511))


### BREAKING CHANGES

* testing github actions for build and publish





# [0.3.0](https://github.com/5cube/vue-supp/compare/v0.2.2...v0.3.0) (2020-12-18)


### Features

* added activator use ([544afef](https://github.com/5cube/vue-supp/commit/544afef93a78f823bee7184a62ae1883bdd6fc61))

* added aspec ratio use

* added attach use

* added dimensions use

* added filter use

* added group use

* added input use

* added input validation use

* added lazy content use

* added measure use

* added popper use

* added utils

### Bug Fixes

* fix(toggle): update types




## [0.2.2](https://github.com/5cube/vue-supp/compare/v0.2.1...v0.2.2) (2020-12-18)

**Note:** Version bump only for package vue-supp





## [0.2.1](https://github.com/5cube/vue-supp/compare/v0.2.0...v0.2.1) (2020-12-18)

**Note:** Version bump only for package vue-supp





# [0.2.0](https://github.com/5cube/vue-supp/compare/v0.1.0...v0.2.0) (2020-12-18)


### Bug Fixes

* added npm publish script ([a11f734](https://github.com/5cube/vue-supp/commit/a11f73428295b83ade0a333910675b48954e580d))


### Features

* added toggle use ([2a02548](https://github.com/5cube/vue-supp/commit/2a02548a8454506dc7d5bf8c02793eccb8f65604))





# 0.1.0 (2020-12-17)


### Features

* added vue-supp package ([ee89537](https://github.com/5cube/vue-supp/commit/ee895372fa599877a28c9746cf0ba5d2e42ba7b4))
