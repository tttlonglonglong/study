import Vue from 'vue'

Vue.config.productionTip = false

// require all test files (files that ends with .spec.js)
//  单元测试原文都在specs目录下
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
//  陪陪除了mainjs之外的js文件
const srcContext = require.context('../../src', true, /^\.\/(?!main(\.js)?$)/)
srcContext.keys().forEach(srcContext)
