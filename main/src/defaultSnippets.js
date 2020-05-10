export default {
  // ${...} represents a placeholder.

  // DataFrame methods
  sel: 'select(${*cols})',
  gb: 'groupBy(${*cols})',
  ob: 'orderBy(${*cols, ascending})',
  obaf: 'orderBy(${*cols}, ascending=False)',
  pb: 'partitionBy(${*cols})',
  fil: 'filter(${condition})',
  filcol: 'filter(F.col(${col}))',
  fna: 'fillna(${value})',
  wc: 'withColumn(${colName, col})',
  wcr: 'withColumnRenamed(${existing, new})',
  jo: 'join(${other, on, how})',
  un: 'union(${other})',
  una: 'unionAll(${other})',
  dp: 'display(${df_or_fig})',
  dph: 'displayHTML(${html})',
  sh: 'show(${nrows, truncate})',
  ps: 'printSchema()',
  sam: 'sample(${withReplacement, fraction, seed})',
  samb: 'sampleBy(${col, fractions, seed=None})',
  st: 'subtract(${other})',
  dt: 'distinct()',
  dr: 'drop(${*cols})',
  drn: 'dropna(${how, thresh, subset})',
  drd: 'dropDuplicates(${subset})',
  tpd: 'toPandas()',

  // Column methods
  al: 'alias(${alias})',
  ca: 'cast(${dataType})',
  at: 'astype(dataType)',
  ow: 'otherwise(${value})',
  ew: 'endswith(${other})',
  sw: 'startswith(${other})',
  isn: 'isNull()',
  isnn: 'isNotNull()',
  isin: 'isin(${*cols})',
  btw: 'between(${lower, upper})',

  // pyspark.sql.functions
  col: 'F.col(${col})',
  lit: 'F.lit(${col})',
  std: 'F.stddev(${col})',
  cnt: 'F.count(${col})',
  cntd: 'F.countDistinct(${col})',
  sum: 'F.sum(${col})',
  sumd: 'F.sumDistinct(${col})',
  min: 'F.min(${col})',
  max: 'F.max(${col})',
  mean: 'F.mean(${col})',
  avg: 'F.avg(${col})',
  len: 'F.length(${col})',
  rnd: 'F.round(${col, scale})',
  uxt: 'F.unix_timestamp(${timestamp, format})',
  up: 'F.upper(${col})',
  low: 'F.lower(${col})',
  tr: 'F.trim(${col})',
  ltr: 'F.ltrim(${col})',
  rtr: 'F.rtrim(${col})',
  ss: 'F.substring(${str, pos, len})',
  rr: 'F.regexp_replace(${str, pattern, replacement})',
  rep: 'F.repeat(${col, n})',
  rev: 'F.reverse(${col})',
  tdt: 'F.to_date(${col})',
  dtad: 'F.date_add(${date})',
  dtsb: 'F.date_sub(${date})',
  dtfmt: 'F.date_format(${date, format})',
  dtdf: 'F.datediff(${end, start})',
  sec: 'F.second(${col})',
  epl: 'F.explode(${col})',

  // Read & write
  srt: 'spark.read.table(${tableName})',
  src: 'spark.read.csv(${path})',
  srp: 'spark.read.parquet(${path})',
  wcsv: 'write.csv(${path})',
  wp: 'write.parquet(${path})',
  wmop: "write.mode('overwrite').parquet(${path})",
  wmap: "write.mode('append').parquet(${path})",
  wmep: "write.mode('error').parquet(${path})",
  wmip: "write.mode('ignore').parquet(${path})",

  // Aggregation
  ag: 'agg(${*exprs})',
  agcnt: 'agg(F.count(${col}))',
  agcntd: 'agg(F.countDistinct(${col}))',
  agsum: 'agg(F.sum(${col}))',
  agsumd: 'agg(F.sumDistinct(${col}))',
  agmean: 'agg(F.mean(${col}))',
  agavg: 'agg(F.avg(${col}))',
  agmin: 'agg(F.min(${col}))',
  agmax: 'agg(F.max(${col}))',

  // Aggregation with alias
  agcnta: "agg(F.count('${col}').alias('${col}_cnt'))",
  agcntda: "agg(F.countDistinct('${col}').alias('${col}_cntd'))",
  agsuma: "agg(F.sum('${col}').alias('${col}_sum'))",
  agsumda: "agg(F.sumDistinct('${col}').alias('${col}_sumd'))",
  agmna: "agg(F.mean('${col}').alias('${col}_mean'))",
  agavga: "agg(F.avg('${col}').alias('${col}_avg'))",
  agmina: "agg(F.min('${col}').alias('${col}_min'))",
  agmaxa: "agg(F.max('${col}').alias('${col}_max'))",

  // dbutils
  dwg: 'dbutils.widgets.get(${varName})',
  dnr: 'dbutils.notebook.run(${notebookPath})',
  dne: 'dbutils.notebook.exit(${value})',
  pypi: 'dbutils.library.installPyPI(${packageName})',

  // udf
  udf: '@F.udf(${type})',
  udfstr: '@F.udf(T.StringType())',
  udfbl: '@F.udf(T.BooleanType())',
  udfsht: '@F.udf(T.ShortType())',
  udfint: '@F.udf(T.IntegerType())',
  udflong: '@F.udf(T.LongType())',
  udfflt: '@F.udf(T.FloatType())',
  udfdbl: '@F.udf(T.DoubleType())',
  udfarr: '@F.udf(T.ArrayType(${dataType}))',

  // Libraries
  np: 'import numpy as np',
  pd: 'import pandas as pd',
  plt: 'import matplotlib.pyplot as plt',
  sns: 'import seaborn as sns',

  // others
  scs: 'sqlContext.sql()',
  ftw: 'from pyspark.sql import functions as F, types as T, window as W',
  shcnt: "select(F.count(${'*'})).show()",
  af: 'ascending=False',
};
