#include<cstdio>
#include<cstdlib>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
    int time;
    scanf("%d",&time);
    while(time--){
        int num,i,j=0;
        scanf("%d",&num);
        vector<int> start;
        vector<int> last;
        int temp,temp1,ans=0,thick=0;
        for(i=0;i<num;i++)
        {
            scanf("%d%d",&temp,&temp1);
            start.push_back(temp);
            last.push_back(temp1);
        }
        sort(start.begin(),start.end());
        sort(last.begin(),last.end());

        for(i=0;i<num;i++){
            while(j<num&&last[j]<start[i]){
                j++;
                thick--;
            }
            thick++;
            ans=max(ans,thick);
        }
        printf("%d\n",ans);
    }
}
