#!/usr/bin/python
# _*_ encoding:utf-8 _*_
# 默认采用utf-8 编码
import sys
defaultencoding = 'utf-8'
if sys.getdefaultencoding() != defaultencoding:
    reload(sys)
    sys.setdefaultencoding(defaultencoding)

'''
date:2017/12/5
'''

# 给linux用的 保证能找到某个地方安装了python
# 告诉解释器我们的编码是
#
# 导入NumPy函数库，一般都是用这样的形式(包括别名np，几乎是约定俗成的叫np)
import numpy as np
import matplotlib as mpl
# 用来画三维图
from mpl_toolkits.mplot3d import Axes3D
# colormap: 画三维图所需要的图像的映射
from matplotlib import cm
# time: 用来验证原始的库和numpy的时间有什么区别
import time
# leastsq: numpy用来优化计算 最小二乘的东西
from scipy.optimize import leastsq
# numpy中非常重要的一个包: 统计包
from scipy import stats
# opt: 做优化的函数
import scipy.optimize as  opt
import scipy

# pythonplot: 用来绘制东西的包
import matplotlib.pyplot as  plt
# 单独引出里面的正态分布的,条状分布的什么..
from scipy.stats import norm, poisson

# 低版本会没有这俩个包
from scipy.interpolate import BarycentricInterpolator
from scipy.interpolate import CubicSpline
import math

# import seaborn

# 防止被调用, 只有主程能调用
if __name__ == "__main__":
    class sectionA(object):
        # numpy是非常好用的数据包，如：可以这样得到这个二维数组
        # [[ 0  1  2  3  4  5]
        #  [10 11 12 13 14 15]
        #  [20 21 22 23 24 25]
        #  [30 31 32 33 34 35]
        #  [40 41 42 43 44 45]
        #  [50 51 52 53 54 55]]
        # 生成从0到60的不包含60, 步长是10, 生成一个横向的行向量
        b = np.arange(0, 60, 10)
        print 'np.arange', b
        # 进行变形, -1行不管, 列是6列
        b = b.reshape(-1, 1)
        print 'b.reshape=', b
        # arange: 只有一个值, 默认从0开始, 步长是1
        aa = np.arange(6)
        print 'aa=列', aa
        #  b的每一列, 加上aa的每一行, 得到一个6*6的多维向量
        cc = b + aa
        a = np.arange(0, 60, 10).reshape((-1, 1)) + np.arange(6)
        print a

        # 正式开始:
        # 标准的Python中的列表(List)中, 元素本质是对象
        # 如: L = [1,2,3,4,5,6], 需要三个指针和三个整数对象, 对于数值运算比较浪费内存和CPU
        # 因此, Numpy提供了ndarray(N-dimensional array boject)对象: 存储单一数据型的多维数组

        # 1. 使用array创建
        # 通过array 函数传递list对象
        L = [1,2,3,4,5,6]
        print '原始的数组', L
        a = np.array(L)
        print '转换成np单一数据类型的多维数据', a
        print type(L), type(a)
        # 若是传递多层嵌套的list, 将创建多维数组
        b = np.array([[1,2,3,4],[5,6,7,8],[9,10,11,12]])
        print 'np的ar 没有逗号', b
        # nsa多维数组的大小开可以通过其他shape属性获得, python的list不能用这个
        # (6,):长度是6的向量, (行或者列); (3,4):三行四列的向量
        print '过得a的大小', a.shape
        print 'aa列的大小', a.shape
        print '获得b-nda的大小', b.shape
        # 也可以强行修改shape, 注:从(3,4)修改为(4,3)并不是对数组进行转制, 而只是改变每个轴的大小, 数组元素在内存中是共享内存的
        # 共享内存意味着， 改变一个会改变另一个
        # 将b年变成4行3列的多维数组, 但是b本身的长度应该是列数: 3的整数
        # 当某个轴是-1的时候
        b.shape  = 4,3
        print '强制修改后的shape', b
        b.shape = 2,-1
        print '当某个轴是-1,自行计算',b
        # 恢复成3行4列的样子
        b.shape = 3,4
        # 使用reshape 方法, 可以创建改变了尺寸的新数组, 原数组的shape保持不变, !!!新数组和原数组共享内存
        # 原数组b和新数组c共享内存, 修改任意一个将影响另一个
        c = b.reshape(4, -1)
        print "b= \n", b
        print "c= \n", c
        # 数组元素的类型可以通过dtype来获得， 浮点数和复数类型
        d = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], dtype=np.float)
        f = np.array([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]], dtype=np.complex)
        print d
        print f
        # 如果改变元素类型， 可以使用astype安全的转换
        f = d.astype(int)
        print '改变元素数据类型',f
        # 但不要强制仅修改元素类型, 如下面这句, 将会以int来解释单精度float类型
        # 强制: 数据类型确实是修改成int了,但是它仅仅是改了数据类型, 改的是他的解释形式,
        # d本质还是一个float类型, 所以打印出来是乱码
        d.dtype = np.int
        print d
        print type(d[0][0])

    #   使用set_printoptions设置输出精度, suppress消除小的数字使用科学记数法
    # ，如有的数据是10位小数，有的是8位，输出不好控制precision为多少好。精度过高就会出错。这时可以使用array.astype(str)转换成字符串输出。如
    np.set_printoptions(linewidth=100, suppress=True)
    # 2.使用函数创建数据
    # 如果生成一定规则的数据, 可以使用Numpy提供的专门函数
    # arange函数类似于python的range函数: 指定起始值, 终止值和步长来创建数据
    # 和python的range类型, arange同样不包括与终值, 但是arabge可以生成浮点数, 而range只能是整数类型
    a = np.arange(1, 10, 0.5)
    print "使用arange函数生成数据", a
    # 可以通过linspace函数：(类似等差数列)通过指定起始值, 终止值和元素个数来创建数组, 缺省包括终止值, 设置endpoint=False可以对终止值设置是否包含
    b = np.linspace(1, 10, 20)
    print "linspace函数创建", b
    # 等比数列: 和linspace类似, logspace可以创建等比数列
    # 下面默认底是10, 函数起始值10^1, 终止值为10^2, 有10个数的等比数列, endpoint: 是否包括最后一个数
    d = np.logspace(1, 2, 9, endpoint=True)
    print '函数生成的等比数列', d
    # 下面创建的起始值为2^0, 终止值为2^10(包括), 有10个数的等比数列
    d = np.logspace(0, 10, 11, endpoint=True, base=2)
    print '函数生成的等比数列', d\
    # 使用frombuffer, fromstring, fromfile,等函数可以从字节序列创建数组
    # 97 + (26 - 1)
    s = 'abc'
    g = np.fromstring(s, dtype=np.int8)
    print '从字符串创建数组', g

    # 3.存储
    # 3.1常规方法: 数组的存取方法和pythin的标准方法相同,
    a = np.arange(10)
    print '数组的存取方法',a
    # 获取某个元素
    print '获取第三个元素', a[3]
    # 切片: 左闭右开
    print a[3:6]
    # 省略开始下标, 从零开始
    print a[:6]
    # 下标为负数表示从后向前数, 第i个开始
    print a[-3:]
    # 步长
    print a[1:9:2]
    # 切片, 前后都不给的时候得到的是翻转, 步长为-1, 即翻转
    # 注: 给了就是空数组,  因为步长-1没法算
    print a[::-1]
    print a[1:9:-1]
    # 切片数据是原数组的一个视图, 与原数组共享内容空间, 可以直接修改元素值
    a[1:4] = 10,20,30
    print a
    # 因此, 在实践中, 切实注意原始数据是否被破坏, 如:
    b = a[2:5]
    b[0] = 200
    print '切片的数组与原数组共享内存',a

    # 3.2 整数/布尔 数组做索引的存取, 用数
    # 3.2.1
    # 根据整数数组存取: 当使用整数序列对数组元素进行存取时,
    # 将使用整数序列中的每个元素作为下标, 数组序列可以是列表(list)或者是数组(ndarray)
    # 使用整数序列作为下标获得的数组不和原始数组共享数据空间
    # 2^0, 2^9
    a = np.logspace(0, 9, 10, base=2)
    print a
    i = np.arange(0, 10, 2)
    print i
    #  利用i取a中的元素
    b = a[i]
    print '利用数组生成的b',b
    # b的元素更改, a中元素不受影响
    b[2] = 1.6
    print 'a', a
    print 'b', b

    # 3.2.2
    # 使用布尔数组i作为下标存取数组a中的元素: 返回数组a中所有的在数组b中对应下标为True的元素
    # 生成10个满足[0, 1)中均匀分布的随机数
    a = np.random.rand(10)
    print a
    # 大于0.5的元素索引
    print a >0.5
    # 大于0.5的元素
    b = a[a > 0.5]
    print '用布尔值用做引得到的数组', b
    # 将原数组中大于0.5的元素 截取成0.5
    a[a > 0.5] = 0.5
    print '将a中大于0.5的数,赋值成0.5', a
    print 'b不受a的影响还是原来的值', b

    # 3.3 二维数组的切片
    # [[ 0  1  2  3  4  5]
    #  [10 11 12 13 14 15]
    #  [20 21 22 23 24 25]
    #  [30 31 32 33 34 35]
    #  [40 41 42 43 44 45]
    #  [50 51 52 53 54 55]]
    # shape得到是共享内存的数据\
    a = np.arange(0, 60, 10) #行向量
    b = a.reshape((-1, 1))  #转换成列向量
    c = np.arange(6 )
    print '3.3--------------------3.3'
    print 'a', a
    a[0] = 11
    print 'b', b, b[3]
    print 'c', c
    # 广播: 一个数和一行做相加, 会把一个数扩展成一行
    f = b + c
    print 'f', f
    # 合并上述代码
    a = np.arange(0, 60, 10).reshape((-1, 1)) + np.arange(6)
    print '合并代码得到a', a

    # 二位数组的切片
    # 第1行第2列, 1行3列, 2行4列
    print '打印二位数组的某些项元素', a[[0, 1, 2], [2, 3, 4]]
    print '打印二位数组某行的某些元素',a[4, [2, 3, 4]]  # 打印第0开始, 4行的2,3,4,个元素
    print '二维数组的切片', a[4:, [2, 3, 4]] #打印4行之后的
    i = np.array([True, False, True, False, False, True])
    print '当标是是布尔值数组的时候: 显示某一行', a[i]  #布尔值下标数组的长度与与二维数组的行数不一致, 会报错
    print '当标是是布尔值数组的时候:  显示某行某列', a[i,[3]]  #布尔值下标数组的长度与与二维数组的行数不一致, 会报错

    # Pyhton 里面有时候告诉我们, 用很暴力的办法,去得到快速的结果, 节约人的时间


    # 4.1 numpy 与 pyhton 数学库的时间比较
    # 数据量到了百万, np的 比 pythion自带的函数 快10倍
    # 计算时间太短的比较没有意义, 使用较大数据的计算, 这里j时刻10^7
    for j in np.logspace(0, 4, 10):
        j = int(j)
        # linspace: 得到等差数列
        x = np.linspace(0, 10,j)
        print '获得的等差数列', x
        start = time.clock()
        y = np.sin(x)
        print '函数操作, 传入的是一个数组, sin得到是sin十一个数字的正弦值', y
        t1 = time.clock() - start

        # np数组 转化成 py真正的数组
        x = x.tolist()
        print x, type(x)
        start = time.clock()
        # i和t 对 多维数组x 遍历---i是编号, t是值
        for i, t in enumerate(x):
            x[i] = math.sin(t)
        print 'for循环遍历出来的x', x
        t2 = time.clock() - start
        #
        print j, ':', t1, t2, t2/t1
    L = [1, 2, 3, 4]
    print 'L', L
    L = np.array(L)
    #  h = math.sin(L)-------会报错
    h = np.sin(L)
    # 使用Python自带的math函数， 必须使用for循环
    print [math.sin(a) for a in L]
    print 'sin',h

    # 4.2 元素的去重
    # 4.2.1直接使用库函数
    a = np.array((1,2,3,4,5,6, 1,2,3,4,5,6))
    # 使用库函数
    a = np.unique(a)
    print '去重后的 a=', a
    # 4.2.2 二维数组的去重，结果会是预期的么？
    # 库函数unique的去重是将多维数组, 拉平成一维数组后, 再去重
    c = np.array(((1, 2), (3, 4), (5, 6), (1, 3), (3, 4), (7, 6)))
    print '二维数组', c
    print '二维数组的去重去重后：', np.unique(c)
    # 4.2.3方案一: 转换为虚数--仅对二维数组有效
    # r, i = np.split(c, (1, ), axis=1)
    # 把c所有的行拿出来, 然后第0列, 然后所有行, 第一列
    x = c[:, 0] + c[:, 1]*1j
    print '转换为虚数的x, 仅仅是将二维数组转换成了一维数组',x
    print '对虚数去重', np.unique(x)
    print np.unique(x, return_index=True) # 思考return_index的意义
    # 方案二： 利用set 解决多维数组 的去重问题, 但是set之后变成无序的了, 会改变数组的顺序
    #  集合(set)是可以变的,    元组(touple)才是不可变的
    print '原多维数组c',c
    print '去重方案2: \n', np.array(list(set([tuple(t) for t in c])))

    # 4.3stack + axis--stack: 堆叠. axis:
    # --python提取相似订单
    a = np.arange(1, 10).reshape((3, 3))
    b = np.arange(11, 20).reshape((3,3))
    c = np.arange(101, 110).reshape((3,3))
    print 'stack+axis--a', a
    print 'stack+axis--b', b
    print 'stack+axis--c', c
    # stack: 堆叠, axis: 轴, axis=0: abc直接进行static, axis=1:对abc的行进行static,,axis=2: 表示对abc的元素做static,从每个函数的第一个开始
    # stack: 增加维度
    print 'axis = 0 \n', np.stack((a, b, c), axis=0)
    print 'axis = 1 \n', np.stack((a, b, c), axis=1)
    print 'axis = 2 \n', np.stack((a, b, c), axis=2)

    a = np.arange(1, 10)
    print a
    b = a + 10
    print b
    print np.stack((a, b))
    print np.stack((a, b), axis=1)

    # 多维数组的乘法
    aaa = np.arange(1, 10).reshape(3,3)
    bbb = aaa + 10
    # [[90  96 102]
    #  [216 231 246]
    # [342 366 390]]
    print 'aaa',aaa
    print 'bbb', bbb
    # 1*11+2*14+3*17
    print 'dot相乘的结果--经典乘法--元素乘以列',np.dot(aaa, bbb)
    # 1*11
    print 'py乘法--对应的元素相乘', aaa*bbb

    # 数组的拼接
    a = np.arange(1, 10)
    b = np.arange(10, 20)
    print '数组的拼接', np.concatenate((a, b))


    # 5.绘图
    # 5.1 绘制正太分布概率密度函数
    # 高斯的期望函数, 大概是0.4左右
    mu = 0 #均值
    sigma = 1 #方差
    # mu-3 mu+3的方差
    x = np.linspace(mu-3 * sigma, mu + 3*sigma, 51)
    y = np.exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (math.sqrt(2 * math.pi) * sigma)
    print x.shape
    print 'x=', x
    print y.shape
    print 'y=', y
    # 背景色
    plt.figure(facecolor='w')
    # x,y做红色的线, x,y再做一个绿色的圈, 然后线宽是2,圈的大小是8
    plt.plot(x, y, 'r-', x, y, 'go', linewidth=2, markersize=8)
    # x轴的名字
    plt.xlabel('X', fontsize=16)
    # y轴的名字
    plt.ylabel('Y', fontsize=16)
    # 图表的标题
    #  标题要是能显示中文的话, 必须设置要是能显示中文的字体---符号, 负号不解析
    mpl.rcParams['font.sans-serif'] = [u'SimHei']  # FangSong/黑体 [u'KaiTi']
    mpl.rcParams['axes.unicode_minus'] = False
    plt.title(u'高斯分布函数', fontsize=18)
    # plt.title(u'Gauss Distribution PDF ')
    # 背景色

    plt.grid(True)
    plt.show()

    # 损失函数: Logistic损失(-1,1)/SVM Hinge损失/ 0/1损失
    # 取-2到3 1001个数
    x = np.array(np.linspace(start=-2, stop=3, num=1001, dtype=np.float))
    # x=0,y=1, 保证过01这个点(e^0=1)
    y_logit = np.log(1 + np.exp(-x)) / math.log(2)
    y_boost = np.exp(-x)

    # 估计对了就没有损失, 估计错了就是1---true/false
    a = np.linspace(-3,3, 10)
    print 'a',a
    print 'a>o得到的是falseorTrue',a>0
    # [False False False False False  True  True  True  True  True]
    # print a<0
    y_01 = x < 0

    # y=1-x的斜线
    y_hinge = 1.0 - x
    y_hinge[y_hinge < 0] = 0
    plt.plot(x, y_logit, 'r-', label='Logistic Loss', linewidth=2)
    plt.plot(x, y_01, 'g-', label='0/1 Loss', linewidth=2)
    plt.plot(x, y_hinge, 'b-', label='Hinge Loss', linewidth=2)
    plt.plot(x, y_boost, 'm--', label='Adaboost Loss', linewidth=2)
    plt.grid()
    # 用来显示label
    plt.legend(loc='upper right')
    # 将画的图保存到根目录的名字
    plt.savefig('1.png')
    plt.show()

    def f(x):
        # likex: 做一个和x形状完全相同的数组
        y = np.ones_like(x)
        # 将x>0的部分提取出来, 101个true/false
        i = x > 0
        # 正的都拿出来, 赋值给y
        y[i] = np.power(x[i], x[i])

        # 将x<0的false, 都拿出来,取负值, 相当于做了一个轴对称
        i = x < 0
        y[i] = np.power(-x[i], -x[i])
        return y
    # 5.3 x^x
    #  从-1.3-->1.3 取101个数
    x = np.linspace(-1.3, 1.3, 101)
    y = f(x)
    plt.plot(x, y, 'g-', label='x^x', linewidth=2)
    plt.grid()
    plt.legend(loc='upper left')
    plt.show()

    # 5.4 胸型线
    x = np.arange(1, 0, -0.001)
    y = (-3 * x * np.log(x) + np.exp(-(40 * (x - 1 / np.e)) ** 4) / 25) / 2
    plt.figure(figsize=(5,7))
    plt.plot(y, x, 'r-', linewidth=2)
    plt.grid(True)
    plt.savefig('breas.png')
    plt.show()

    # 5.5 心形线
    # 这里的7, 只要是大于2*np.pi的都可以
    t = np.linspace(0, 7, 100)
    x = 16 * np.sin(t) ** 3
    y = 13 * np.cos(t) - 5 * np.cos(2*t) - 2 * np.cos(3*t) - np.cos(4*t)
    plt.plot(x, y, 'r-', linewidth=2)
    plt.grid(True)
    plt.show()


    # # 5.6 渐开线
    t = np.linspace(0, 50, num=1000)
    x = t*np.sin(t) + np.cos(t)
    y = np.sin(t) - t*np.cos(t)
    plt.plot(x, y, 'r-', linewidth=2)
    plt.grid()
    plt.show()

    # # Bar
    # mpl.rcParams['font.sans-serif'] = [u'SimHei']  #黑体 FangSong/KaiTi
    # mpl.rcParams['axes.unicode_minus'] = False
    x = np.arange(0, 10, 0.1)
    y = np.sin(x)
    plt.bar(x, y, width=0.04, linewidth=0.2)
    plt.plot(x, y, 'r--', linewidth=2)
    plt.title(u'Sin曲线')
    plt.xticks(rotation=-60)
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.grid()
    plt.show()