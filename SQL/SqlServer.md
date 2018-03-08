
查询 将当前年每个月的数据的总和
```
SELECT
	SUM (actnum) as actnum ,SUM (plannum) as plannum,CONVERT(VARCHAR(6),sale.actfp7,112)
FROM
	aps_saleplan sale
WHERE
	sale.del_flag = '0'
AND sale.productid = '0677dd76fc6043ba96f08fce8ac9a8a1'
AND sale.clientid = '7a2f3c06ac33446ca1f2ee9cd278a34d'
AND datepart(year,sale.actfp7) = year(getdate())
GROUP BY
	CONVERT(VARCHAR(6),sale.actfp7,112)
ORDER BY
	CONVERT(VARCHAR(6),sale.actfp7,112)
```