import pandas as pd
import matplotlib.pyplot as plt

# CSV 파일 경로
csv_file = '/Users/bbuminuchan/Desktop/MyRectal/code/PorscheDatapi/시도/1.csv'

# CSV 파일을 DataFrame으로 읽기
df = pd.read_csv(csv_file)

# 데이터프레임 내용 확인 (선택사항)
print(df)

# 그래프 그리기
plt.plot(df['time'], df['temp'])  # 'time'열을 x축으로, 'temp'열을 y축으로 사용하여 그래프 그리기
plt.xlabel('Time')      # x축 라벨 설정
plt.ylabel('Temperature')      # y축 라벨 설정
plt.title('Temperature vs. Time')     # 그래프 제목 설정
plt.grid(True)               # 격자 표시 여부 설정 (True로 설정하면 격자가 표시됨)
plt.show()                   # 그래프 보여주기