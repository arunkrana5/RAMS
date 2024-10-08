USE [KAFF_V1]
GO
/****** Object:  StoredProcedure [dbo].[spu_GetTradeWiseData]    Script Date: 09-08-2024 03:55:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--spu_GetTradeWiseData 1209,'09-Aug-2024'
ALTER PROCEDURE [dbo].[spu_GetTradeWiseData] (    @LoginID INT, @Date VARCHAR(50))
AS
BEGIN
    DECLARE @Current_Date DATE, @Current_StartDate Date,@Current_LTD Date,@Current_StartDateLTD Date
	Declare @LastYear_Date DATE,@LastYear_StartDate Date,@LastYear_LTD Date,@LastYear_StartDateLTD DATE;
	SET @Current_Date = CAST(@Date AS DATE);
	SET @Current_StartDate = DATEADD(month, DATEDIFF(month, 0, @Current_Date), 0);
	Set @Current_LTD=DATEADD(month, -1, @Current_Date);
	set @Current_StartDateLTD=DATEADD(month, DATEDIFF(month, 0, @Current_LTD), 0);
    
	SET @LastYear_Date = DATEADD(YEAR, -1, @Current_Date);
	SET @LastYear_StartDate = DATEADD(month, DATEDIFF(month, 0, @LastYear_Date), 0);
	Set @LastYear_LTD=DATEADD(month, -1, @LastYear_Date)
	set @LastYear_StartDateLTD=DATEADD(month, DATEDIFF(month, 0, @LastYear_LTD), 0);
    
	print '@Current_Date ='+Cast(@Current_Date as varchar(500))
	print '@Current_StartDate ='+Cast(@Current_StartDate as varchar(500))
	print '@Current_LTD ='+Cast(@Current_LTD as varchar(500))
	print '@@Current_StartDateLTD ='+Cast(@Current_StartDateLTD as varchar(500))

	print '@LastYear_Date = '+Cast(@LastYear_Date as varchar(500))
	print '@LastYear_StartDate ='+Cast(@LastYear_StartDate as varchar(500))
	print '@LastYear_LTD ='+Cast(@LastYear_LTD as varchar(500))
	print '@@LastYear_StartDateLTD ='+Cast(@LastYear_StartDateLTD as varchar(500))

    DECLARE @RelatedEMP TABLE (ID INT);
    INSERT INTO @RelatedEMP
    SELECT * FROM dbo.GetLinkedHierarchy('SSR', @LoginID);

    DECLARE @ResultTable TABLE ( ID INT IDENTITY(1,1) PRIMARY KEY,Trade VARCHAR(50),StoreName VARCHAR(500),
	Current_ActiveISD INT default 0,Current_ActiveISDLTD INT default 0,Current_SalesAmt float default 0,Current_SalesAmtApproved float default 0,
	Current_SalesAmtApprovedLTD float default 0,
	Current_ActiveISDPer float default 0,  Current_SalePer float default 0,
	LastYear_ActiveISD INT default 0,LastYear_SalesAmtApproved float default 0,
	LastYear_ActiveISDPer float default 0, LastYear_SalePer float default 0);

	insert into @ResultTable(Trade,StoreName,Current_SalesAmt,Current_SalesAmtApproved)
	SELECT DT.Code AS Trade,
	CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS [Store Name],
	ISNULL(SUM(E.Price), 0) AS Current_SalesAmt,
	ISNULL(SUM(CASE WHEN E.Approved = 1 THEN E.Price ELSE 0 END), 0) AS Current_SalesAmtApproved
	FROM  Master_Dealer AS d
	INNER JOIN Master_Dealer_Type AS DT ON DT.DealerTypeID = D.DealerTypeID 
	inner join Master_Emp as EMP on EMP.DealerID=d.DealerID and EMP.Isdeleted=0
	inner join Login_Users as U on U.LoginID=EMP.LoginID and U.Isdeleted=0
	left JOIN SalesEntry AS e ON e.DealerID = d.DealerID AND e.Isdeleted = 0 
	and cast(e.Date as date) >=  @Current_StartDate and cast(e.Date as date) <= @Current_Date 
	and e.EMPID in(select * from @RelatedEMP)
	WHERE d.Isdeleted=0 and d.IsActive=1 and U.RoleID=8 and
	EMP.DOJ <= @Current_Date  AND (EMP.DOL >= @Current_Date OR EMP.DOL IS NULL)   
	GROUP BY DT.Code, CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END

	
	UPDATE RT SET RT.Current_SalesAmtApprovedLTD = CSL.Current_SalesAmtApprovedLTD
	FROM @ResultTable RT INNER JOIN (
	SELECT CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS DealerName,ISNULL(SUM(E1.Price), 0) AS Current_SalesAmtApprovedLTD
	FROM SalesEntry AS E1 INNER JOIN Master_Dealer AS D ON E1.DealerID = D.DealerID
	INNER JOIN Master_Dealer_Type AS DT ON DT.DealerTypeID = D.DealerTypeID
	where E1.IsDeleted = 0 AND E1.Approved = 1 AND cast(E1.Date as date) >=  @Current_StartDateLTD and cast(E1.Date as date) <= @Current_LTD  and E1.Isdeleted =0
	and  E1.EMPID in(select * from @RelatedEMP)
	GROUP BY DT.Code, CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END) AS CSL ON RT.StoreName = CSL.DealerName;


	-- Update LastYear_SalesAmtApproved
	UPDATE RT SET RT.LastYear_SalesAmtApproved = isnull(LYSA.LastYear_SalesAmtApproved,0)
	FROM @ResultTable RT INNER JOIN (
	SELECT CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS DealerName,ISNULL(SUM(E1.Price), 0) AS LastYear_SalesAmtApproved
	FROM SalesEntry AS E1 INNER JOIN Master_Dealer AS D ON E1.DealerID = D.DealerID
	INNER JOIN  Master_Dealer_Type AS DT ON DT.DealerTypeID = D.DealerTypeID
	WHERE E1.IsDeleted = 0 AND E1.Approved = 1 AND CAST(E1.Date AS DATE) >= @LastYear_StartDate AND CAST(E1.Date AS DATE) <= @LastYear_Date
	and  E1.EMPID in(select * from @RelatedEMP)
	GROUP BY DT.Code, CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END) AS LYSA ON RT.StoreName = LYSA.DealerName;

	--Done Current_ActiveISD
	UPDATE RT SET RT.Current_ActiveISD = CAISD.Current_ActiveISD
	FROM   @ResultTable RT INNER JOIN (
	SELECT  CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS DealerName, COUNT(TV.EMPID) AS Current_ActiveISD
	FROM   Master_Emp AS TV  INNER JOIN         Master_Dealer AS D ON D.DealerID = TV.DealerID    
	INNER JOIN  Master_Dealer_Type AS DT ON D.DealerTypeID = DT.DealerTypeID
	WHERE  (TV.DOL>=@Current_Date or TV.DOL is null)
	--TV.DOJ <= @Current_Date  AND (TV.DOL >= @Current_Date OR TV.DOL IS NULL)   
	AND TV.EMPID IN (SELECT * FROM @RelatedEMP)
	GROUP BY  CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END) AS CAISD ON RT.StoreName = CAISD.DealerName;


	UPDATE RT SET RT.Current_ActiveISDLTD = CAISDL.Current_ActiveISDLTD
	FROM @ResultTable RT INNER JOIN (
	SELECT CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS DealerName,  COUNT(TV.EMPID) AS Current_ActiveISDLTD
	FROM Master_Emp AS TV  INNER JOIN Master_Dealer AS D ON D.DealerID = TV.DealerID
	INNER JOIN Master_Dealer_Type AS DT ON D.DealerTypeID = DT.DealerTypeID
	WHERE TV.DOJ <= @Current_LTD AND (TV.DOL >= @Current_LTD OR TV.DOL IS NULL)
	AND TV.EMPID IN (SELECT * FROM @RelatedEMP)
	GROUP BY CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END) AS CAISDL ON RT.StoreName = CAISDL.DealerName;


	UPDATE RT SET RT.LastYear_ActiveISD = LYIS.LastYear_ActiveISD
	FROM  @ResultTable RT INNER JOIN (
	SELECT CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END AS DealerName, COUNT(TV.EMPID) AS LastYear_ActiveISD
	FROM Master_Emp AS TV INNER JOIN Master_Dealer AS D ON D.DealerID = TV.DealerID
	INNER JOIN Master_Dealer_Type AS DT ON D.DealerTypeID = DT.DealerTypeID
	WHERE TV.DOJ <= @LastYear_LTD AND (TV.DOL >= @LastYear_LTD OR TV.DOL IS NULL)	
	AND TV.EMPID IN (SELECT * FROM @RelatedEMP)
	GROUP BY  CASE WHEN DT.Code = 'GT' THEN 'REST STORE' ELSE D.DealerName END) AS LYIS ON RT.StoreName = LYIS.DealerName;



	-- Update percentages in @ResultTable
	UPDATE @ResultTable SET 
    Current_ActiveISDPer = CASE 
        WHEN Current_ActiveISDLTD <> 0 
        THEN ROUND(((Current_ActiveISD - Current_ActiveISDLTD) * 100 / Current_ActiveISDLTD), 0)
        ELSE 0 
    END,
    Current_SalePer = CASE 
        WHEN Current_SalesAmtApprovedLTD <> 0 
        THEN ROUND(((Current_SalesAmt - Current_SalesAmtApprovedLTD) * 100 / Current_SalesAmtApprovedLTD), 0)
        ELSE 0 
    END,
    LastYear_ActiveISDPer = CASE 
        WHEN LastYear_ActiveISD <> 0 
        THEN ROUND(((Current_ActiveISD - LastYear_ActiveISD) * 100/ LastYear_ActiveISD), 2)
        ELSE 0 
    END,
    LastYear_SalePer = CASE 
        WHEN LastYear_SalesAmtApproved <> 0 
        THEN ROUND(((Current_SalesAmt - LastYear_SalesAmtApproved) * 100 / LastYear_SalesAmtApproved), 0)
        ELSE 0 
    END;


							
	-- Insert the summary row at the end of the result set
	SELECT ROW_NUMBER() OVER (ORDER BY Trade) AS [S.No.],Trade,[StoreName],
	ISNULL(Current_ActiveISD, 0) AS [Active ISD Count],
	ISNULL(Current_SalesAmt, 0) AS [Sales Uploaded by ISD],
	ISNULL(Current_SalesAmtApproved, 0) AS [Sales by ASM],
	ISNULL(Current_ActiveISDLTD, 0) AS [Active ISD Count LMTD],
	ISNULL(Current_SalesAmtApprovedLTD, 0) AS [Uploaded Sales LMTD],
	CONCAT(ISNULL(Current_ActiveISDPer, 0),'%') AS [ISD Count % LMTD Vs Till date],
	CONCAT(ISNULL(Current_SalePer, 0),' %') AS [Sales % LMTD Vs Till date],
	ISNULL(LastYear_ActiveISD, 0) AS [Last Year Active ISD Count],
	ISNULL(LastYear_SalesAmtApproved, 0) AS [Last Year Uploaded Sales],
	CONCAT(ISNULL(LastYear_ActiveISDPer, 0),' %') AS [ISD Count % LYTD Vs Till date],
	CONCAT(ISNULL(LastYear_SalePer, 0),' %') AS [Sales % LYTD Vs Till date]
	FROM  @ResultTable
	UNION ALL
	SELECT  '' AS [S.No.],'Total' AS Trade,'' AS [Store Name],
	ISNULL(SUM(Current_ActiveISD), 0) AS [Active ISD Count],
	ISNULL(SUM(Current_SalesAmt), 0) AS [Sales Uploaded by ISD],
	ISNULL(SUM(Current_SalesAmtApproved), 0) AS [Sales by ASM],
	ISNULL(SUM(Current_ActiveISDLTD), 0) AS [Active ISD Count LMTD],
	ISNULL(SUM(Current_SalesAmtApprovedLTD), 0) AS [Uploaded Sales LTD],
    CASE 
        WHEN sum(Current_ActiveISD) IS NOT NULL AND sum(Current_ActiveISDLTD) <> 0 
        THEN CONCAT(CAST(ROUND(((sum(Current_ActiveISD) - sum(Current_ActiveISDLTD)) / sum(Current_ActiveISDLTD)) * 100, 0) AS INT), '%')
        ELSE '0%' 
    END as [ISD Count % LMTD Vs Till date],
    
    CASE   
        WHEN sum(Current_SalesAmt) IS NOT NULL AND sum(Current_SalesAmtApprovedLTD) <> 0 
        THEN CONCAT(CAST(ROUND(((sum(Current_SalesAmt) - sum(Current_SalesAmtApprovedLTD)) / sum(Current_SalesAmtApprovedLTD)) * 100, 0) AS INT), '%')
        ELSE '0%' 
    END as [Sales % LMTD Vs Till date],
    
    ISNULL(SUM(LastYear_ActiveISD), 0) AS [Last Year Active ISD Count],
    ISNULL(SUM(LastYear_SalesAmtApproved), 0) AS [Last Year Uploaded Sales],
    
    CASE 
        WHEN sum(LastYear_ActiveISD) IS NOT NULL AND sum(Current_ActiveISD) <> 0 
        THEN CONCAT(CAST(ROUND(((sum(LastYear_ActiveISD) - sum(Current_ActiveISD)) / sum(Current_ActiveISD)) * 100, 0) AS INT), '%')
        ELSE '0%' 
    END as [ISD Count % LYTD Vs Till date],
    
    CASE   
        WHEN sum(LastYear_SalesAmtApproved) IS NOT NULL AND sum(Current_SalesAmt) <> 0 
        THEN CONCAT(CAST(ROUND(((sum(LastYear_SalesAmtApproved) - sum(Current_SalesAmt)) / sum(Current_SalesAmt)) * 100, 0) AS INT), '%')
        ELSE '0%' 
    END as [Sales % LYTD Vs Till date]
	FROM 
	@ResultTable

	select ROW_NUMBER() OVER (ORDER BY E.EMPCode,E.EMPName) AS [S.No.],E.EMPCode as [EMP Code], E.EMPName as [EMP Name],
	mstDesign.DesignName as [Designation Name],format(E.DOJ,'dd-MMM-yyyy')as DOJ,D.DealerName as [Dealer Name],MA.Value as [Area],
	(case when E.DOL is not null then format(E.DOL,'dd-MMM-yyyy') else '-' end) as DOL,
	isnull((select sum(s.Price) from SalesEntry as s where s.Isdeleted=0 and s.EMPID=E.EMPID and Month(s.Date)=Month(@Current_Date) and Year(s.Date)=Year(@Current_Date) 
	and s.Approved in (0,1) and s.date<=@Current_Date),0) as [Sales Amount till date]
	from Master_Emp as E 
	inner join master_Dealer as d on d.DealerID=E.DealerID
	inner join Master_Designation as mstDesign on mstDesign.DesignID=E.DesignID
	inner join Master_Department as mstDepartment on mstDepartment.DeptID=E.DepartID
	inner join Master_Dealer_Type as MDT on MDT.DealerTypeID=d.DealerTypeID
	inner join Master_Branch as MB on MB.BranchID=d.BranchID
	inner join Masters as MA on  MA.TableName='Area' and  d.AreaID = MA.MasterID and MA.Isdeleted=0
	where E.Isdeleted=0 and (E.DOL is null or (Month(E.DOL)=Month(@Current_Date) and Year(E.DOL)=Year(@Current_Date)))
	AND E.EMPID IN (SELECT * FROM @RelatedEMP)
	group by E.EMPID,E.EMPName ,E.EMPCode,
	mstDesign.DesignName,format(E.DOJ,'dd-MMM-yyyy'),D.DealerName,MA.Value,(case when E.DOL is not null then format(E.DOL,'dd-MMM-yyyy') else '-' end)


END;
